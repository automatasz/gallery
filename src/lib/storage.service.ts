import { UTApi } from "uploadthing/server";
import { env } from "~/env.js";
import { findImage, getImages as getAllImages } from "~/lib/db.service";

const uploadthing = new UTApi({
  token: env.STORAGE_TOKEN,
});

export async function getImageLink(src: string) {
  const image = await findImage(src);
  return image[0]?.url;
}

export async function getImages() {
  return getAllImages();
}

export async function uploadImageUrl(src: string) {
  const response = await uploadthing.uploadFilesFromUrl(src);
  
  if (response.error) {
    console.error(response.error);
    throw new Error(response.error.message, { cause: response.error });
  }

  return response.data;
}
