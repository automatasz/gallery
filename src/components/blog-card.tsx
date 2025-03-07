import { RiArrowDropRightLine } from "react-icons/ri";
import Link from "next/link";
import { BlurImage } from "~/components/blur-image";

export interface BlogCardProps {
  title: string;
  description?: string;
  slug: string;
  date?: string;
  readingTime?: number;
  wordCount?: number;
  banner?: string;
}

export function BlogCard({ title, description, slug, readingTime, wordCount, banner }: BlogCardProps) {
  const linkToArticle = `/b/${slug}`;

  return (
    <div className="group card transition-colors sm:card-side hover:bg-base-200 sm:max-w-none">
      <div className="card-body">
        <div className="flex flex-row gap-2">
          {wordCount && <div className="badge badge-primary badge-outline">{wordCount} words</div>}
          {readingTime && <div className="badge badge-primary badge-outline">{Math.ceil(readingTime / 60)} min read</div>}
        </div>
        <Link href={linkToArticle}>
          <h2 className="card-title text-2xl font-bold transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:text-accent">
            {title}
          </h2>
        </Link>
        <p>{description}</p>
      </div>
      {banner && (
        <div className="flex items-center justify-center p-6 sm:max-w-[12rem]">
          <Link href={linkToArticle}>
            <figure className="relative w-full sm:w-32 !rounded-btn object-cover transition-all duration-300 ease-in-out group-hover:scale-305">
              {banner && (
                <BlurImage
                  src={banner}
                  alt={title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 20vw, 10vw"
                  loading="lazy"
                />
              )}
              {!banner && (
                <div className="grow h-32"></div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 ease-in-out group-hover:bg-opacity-50">
                <RiArrowDropRightLine
                  className="translate-x-full transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                  size={24}
                />
              </div>
            </figure>
          </Link>
        </div>
      )}
    </div>
  );
}
