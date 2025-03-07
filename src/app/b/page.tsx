import { BlogCardList } from "~/components/blog-card-list";
import { getBlogPostsInfo } from "~/lib/cms.service";
import Image from "next/image";

export default async function Blog() {
  const posts = await getBlogPostsInfo();

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <div className="absolute inset-0 z-0 h-[70vh] bg-black opacity-50">
        <Image
          className="object-cover"
          src="/images/hero.png"
          alt="Green-haired woman in animation style"
          priority
          fill
          sizes="100vw"
        />
      </div>
      <section className="relative z-10 mx-auto mt-[56vh] max-w-screen-lg">
        <div className="rounded-2xl rounded-b-none bg-base-300 md:mx-4 md:p-8">
          <BlogCardList blogs={posts} />
        </div>
      </section>
    </main>
  );
}
