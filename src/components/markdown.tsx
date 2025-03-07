import Markdown from "react-markdown";
import { BlurImage } from "./blur-image";

export const MarkdownCustom = ({ page }: { page: string }) => {
  return (
    <article className="prose md:prose-lg lg:prose-xl mx-auto py-4">
      <Markdown
        components={{
          img: (props: { src: string; alt: string }) => {
            return (
              <span className="relative">
                <BlurImage src={props.src} alt={props.alt} />
              </span>
            );
          },
        }}
      >
        {page}
      </Markdown>
    </article>
  );
};
