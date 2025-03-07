// blog card list component
import { BlogCard, type BlogCardProps } from "./blog-card";
// use blogcardprops type

type BlogCardListProps = {
  blogs: BlogCardProps[];
};

export function BlogCardList({ blogs }: BlogCardListProps) {
  return (
    <div className="space-y-4">
      {blogs.map((blog, index) => (
        <BlogCard {...blog} key={index} />
      ))}
    </div>
  );
}
