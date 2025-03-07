"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import type { TImage } from "~/types/image.types";
import { LoadingSpinner } from "./loading-spinner";

export function MasonryGallery({ imageList }: { imageList: TImage[] }) {
  const [images, setImages] = useState<TImage[][]>([]);
  const [selectedImage, setSelectedImage] = useState<TImage>();

  const splitImageArray = useCallback(
    (columnCount: number) => {
      if (columnCount < 2) {
        return [imageList];
      }

      const list = imageList.filter((image) => image.width && image.height).map((image) => ({
        ...image,
        aspectRatio: image.height! / image.width!, // filtered out images without width or height
      }));

      const columns = Array.from({ length: columnCount }, () =>
        Array<TImage>(),
      );
      const columnAspectSums = Array<number>(columnCount).fill(0);

      for (const image of list) {
        let targetColumnIndex = 0;
        let minAspectSum = columnAspectSums[0];

        for (let i = 1; i < columnCount; i++) {
          if (columnAspectSums[i]! < minAspectSum!) {
            targetColumnIndex = i;
            minAspectSum = columnAspectSums[i];
          }
        }

        columns[targetColumnIndex]!.push(image);
        columnAspectSums[targetColumnIndex]! += image.aspectRatio;
      }

      return columns;
    },
    [imageList],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setImages(splitImageArray(4));
      } else if (window.innerWidth >= 768) {
        // md breakpoint
        setImages(splitImageArray(3));
      } else if (window.innerWidth >= 640) {
        // sm breakpoint
        setImages(splitImageArray(2));
      } else {
        setImages([imageList]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageList, splitImageArray]);

  const [isLoading, setIsLoading] = useState(true);
  const openModal = (image: TImage) => {
    setIsLoading(true);
    setSelectedImage(image);
  };
  const closeModal = () => setSelectedImage(undefined);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Loop over image columns */}
        {images.map((imageColumn, index) => (
          <div key={index} className="flex flex-col gap-4">
            {imageColumn.map((image) => (
              <div
                key={image.key}
                className="group relative h-auto w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openModal(image)}
              >
                <Image
                  className="!relative h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={image.base64}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50">
                  <span className="text-lg font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="bg-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative h-full w-full">
            <Image
              className="h-full w-full !bg-contain object-contain" // !bg-contain to override bg-cover which is set by default and makes the blur image fullscreen instead of covering just the image
              src={selectedImage.src}
              alt={selectedImage.alt}
              height={selectedImage.height}
              width={selectedImage.width}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={selectedImage.base64}
              onLoadingComplete={() => setIsLoading(false)}
            />
            {isLoading && (
              <div className="absolute inset-0 z-[60] flex items-center justify-center">
                <LoadingSpinner color="secondary" />
              </div>
            )}
            <div className="absolute inset-0 z-[60] flex items-end justify-center text-secondary">
              <button className="btn btn-circle btn-secondary mb-4 transform delay-150 hover:-translate-y-1 hover:scale-110 duration-300 z-[60] text-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
