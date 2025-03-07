"use server";

import { getImage } from "~/lib/image.service";
import Image, { type ImageProps } from "next/image";

interface BlurImageProps extends ImageProps {
  src: string;
}

export async function BlurImage({ src, alt, sizes, ...props }: BlurImageProps) {
  const image = await getImage(src, alt);
  
  return (
    <Image
      src={image.src}
      alt={alt}
      height={image?.height}
      width={image?.width}
      placeholder="blur"
      blurDataURL={image?.base64}
      loading="lazy"
      className="h-auto w-full rounded-lg"
      sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      {...props}
    />
  );
}
