"use server";

import { unstable_cache } from "next/cache";
import { getImageLink, getImages, uploadImageUrl } from "~/lib/storage.service";
import { validateImageUrl } from "~/lib/notion/image-url-validator";
import path from "node:path";
import sharp from "sharp";
import { performance } from "perf_hooks";
import { insertImage } from "~/lib/db.service";

export const getImage = unstable_cache(
  getImageSimple,
  ["image"],
  {
    revalidate: false,
    tags: ["image"],
  },
);

export const getGalleryImages = unstable_cache(
  getGalleryImagesSimple,
  ["images"],
  {
    revalidate: false,
    tags: ["images"],
  },
);

async function getImageSimple(src: string, alt?: string, optimizedUrl?: string) {
  const startTime = performance.now();

  const blogLink = convertBlogImageLink(src);
  let imageLink = optimizedUrl ?? await getImageLink(blogLink || src);

  if (!imageLink && blogLink) {
    const image = await uploadImageUrl(src);
  
    await insertImage({
      path: blogLink,
      url: image.ufsUrl,
      category: "blog",
      alt: alt ?? "Uh oh, something went wrong, could not retrieve the description",
    });

    imageLink = await getImageLink(blogLink);
  }

  if (imageLink == null) {
    throw new Error(`Image not found or could not be uploaded ${src}`);
  }

  const arrayBuffer = await fetch(imageLink).then((res) => {
    if (res.ok) {
      return res.arrayBuffer();
    } else {
      return null;
    }
  });
  
  const buffer = arrayBuffer === null ? null : Buffer.from(arrayBuffer);

  if (buffer === null) {
    throw new Error(`Image not found or could not be uploaded ${imageLink}`);
  }

	const { width, height, blurDataURL } = await getImageMetadata(buffer);

  const endTime = performance.now();
  console.log(`${src.slice(0, 150)} Image loading time: ${endTime - startTime} ms`);

  return {
    src: imageLink,
    alt: alt ?? "Uh oh, something went wrong, could not retrieve the description",
    width,
    height,
    key: getRandomKey(),
    base64: blurDataURL,
  };
}

async function getGalleryImagesSimple() {
  const images = await getImages();
  const imagePromises = images.map((image) => getImage(image.path, image.alt, image.url));

  return Promise.all(imagePromises);
}

function convertBlogImageLink(src: string) {
  const externalUrlValidation = validateImageUrl(src);
  
  if (!externalUrlValidation.success) {
    return false;
  }

  const { uuid1, imageName, extension } = externalUrlValidation.data;
  return path.join("blog", `${uuid1}_${imageName}.${extension}`);
}

function getRandomKey() {
  return Math.random().toString(36).substring(2, 18);
}

async function getImageMetadata(buffer: Buffer) {
  const sharpImage = sharp(buffer); // Get image path
  const { width, height } = await sharpImage.metadata(); // Get image dimensions
  const placeholder = await sharpImage.resize(10).toBuffer(); // Resize to 10px wide
	const blurDataURL = `data:image/png;base64,${placeholder.toString("base64")}`; // Prepend data URL

  return { width, height, blurDataURL };
}
