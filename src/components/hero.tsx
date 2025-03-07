import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-10 bg-black opacity-50">
        <Image
          className="object-cover"
          src="/images/hero.png"
          alt="Green-haired woman in animation style"
          priority
          fill
          sizes="100vw"
        />
      </div>
      <div className="relative z-20 px-4 py-20 text-center break-words md:px-0">
        <h1 className="mb-4 text-6xl font-bold">
          Discover Stunning AI-Generated Images
        </h1>
        <p className="mb-8 text-xl">
          Explore a vast collection of unique and breathtaking AI-generated
          artwork, perfect for any project or inspiration.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/b" className="btn btn-primary btn-lg" type="button">Explore</Link>
        </div>
      </div>
    </section>
  );
}
