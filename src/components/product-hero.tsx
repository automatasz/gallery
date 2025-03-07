import { cn } from "~/lib/utils";
import { BlurImage } from "~/components/blur-image";

interface ProductHeroProps {
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  ctaText: string;
  order: "photo-first" | "text-first";
  imageSrc: string;
  imageAlt: string;
}

export function ProductHero({
  imageSrc,
  imageAlt,
  title,
  description,
  price,
  discountPercentage,
  ctaText,
  order,
}: ProductHeroProps) {
  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : price;

  return (
    <section className="w-full bg-primary-foreground">
      <div
        className={cn(
          "grid gap-6 px-8 py-12 lg:py-0 lg:gap-12 lg:px-0 break-words",
          order === "photo-first" &&
            "md:grid-cols-[1fr_400px] lg:grid-cols-[500px_1fr] xl:grid-cols-[800px_1fr]",
          order === "text-first" &&
            "md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_800px]",
        )}
      >
        <BlurImage 
          src={imageSrc}
          alt={imageAlt}
          className={cn(
            "aspect-3/2 mx-auto w-full max-w-screen-sm overflow-hidden rounded-xl h-auto object-cover object-center lg:max-w-screen-lg lg:rounded-none",
            order === "text-first" && "lg:order-last",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
        />
        <div className={cn("flex flex-col justify-center space-y-4 text-justify", order === "text-first" && "lg:pl-4 items-end", order === "photo-first" && "lg:pr-4")}>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {title}
            </h1>
            <p className="max-w-[600px] md:text-xl">{description}</p>
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <div className="space-y-1">
              <p className="text-4xl font-bold text-primary">
                ${discountedPrice.toFixed(2)}
              </p>
              {discountPercentage && (
                <p className="text-sm text-muted-foreground line-through">
                  ${price.toFixed(2)}
                </p>
              )}
            </div>
            {discountPercentage && (
              <div className="badge badge-primary">
                {discountPercentage}% OFF
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <button className="btn btn-primary">
              {ctaText}
            </button>
            <button className="btn btn-secondary btn-outline">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
