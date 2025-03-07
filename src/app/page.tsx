import { Hero } from "~/components/hero";
import { MasonryGallery } from "~/components/masonry-gallery";
import { ProductHero } from "~/components/product-hero";
import { getGalleryImages } from "~/lib/image.service";

export default async function Home() {
  const images = await getGalleryImages();

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <Hero />
      <section className="py-8 px-2 relative">
        <div className="mx-auto max-w-screen-lg">
          <h2 className="text-3xl font-bold mb-4">Featured</h2>
        </div>
        <MasonryGallery imageList={images} />
      </section>
        <ProductHero
          imageSrc="cat.webp"
          imageAlt="Angry cat"
          title="dyed to your liking"
          description="Transform your look with our custom hoodies, crafted just for you! Choose from a wide range of colors and create a piece that’s truly yours. Whether you want bold or subtle, each hoodie is designed for comfort and made to match your vibe. Make every color count—start customizing today!"
          price={299.99}
          discountPercentage={20}
          ctaText="Pre-order Now"
          order="photo-first"
        />
        <ProductHero
          imageSrc="cat-2.webp"
          imageAlt="Calm cat"
          title="handmade hoodie"
          description="Step up your style game with our custom hoodies, designed to be as unique as you are. Made from premium fabrics and personalized to reflect your personality, our hoodies aren’t just about comfort—they’re your statement piece, your cozy companion, and a wardrobe essential all in one. Create your perfect fit today!"
          price={399.99}
          discountPercentage={20}
          ctaText="Pre-order Now"
          order="text-first"
        />
    </main>
  );
}
