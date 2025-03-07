import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownCustom } from "~/components/markdown";
import { getBlogPostsInfo, getPageMarkdownBySlug } from "~/lib/cms.service";
import { RiArrowUpSLine } from "react-icons/ri";

export const dynamicParams = true; // generate newly published posts
export const revalidate = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getBlogPostsInfo();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageMarkdownBySlug(slug);

  if (!page?.parent) {
    notFound();
  }

  return (
    <main className="font-[family-name:var(--font-geist-sans)] pt-20 px-2" id="top">
      <MarkdownCustom page={page.parent} />
      <div className="prose md:prose-lg lg:prose-xl mx-auto mb-8">
        <div className="flex flex-row gap-2">
          <Link href="/b/" className="btn btn-primary btn-outline">go back</Link>
          <Link href="#top" className="btn btn-secondary btn-outline btn-circle">
            <RiArrowUpSLine size={24} />
          </Link>
        </div>
      </div>
    </main>
  );
}
