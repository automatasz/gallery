import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { env } from "~/env";
import { Logger } from "~/lib/logger.service";
import type { Post } from "~/types/notion.types";
import { getPlainRichText } from "~/lib/notion/helpers";
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

type Page =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse;

const notion = new Client({
  auth: env.NOTION_KEY,
});

const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: { parseChildPages: false },
});

const getBlogPosts = async () => {
  const database_id = env.NOTION_DATABASE_ID;
  if (!database_id) {
    throw new Error("Database ID not set");
  }

  return notion.databases.query({
    database_id,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [{ property: "Posted", direction: "descending" }],
  });
};

const getPostsInfo = (pages: Page[]) => {
  const postInfoList: Post[] = [];
  for (const page of pages) {
    if (!("properties" in page)) {
      Logger.warn("Page does not have properties", page);
      continue;
    }

    const pageInfo: Post = { slug: "", title: "", id: page.id };

    if (
      page.properties.Slug?.type === "rich_text" &&
      Array.isArray(page.properties.Slug?.rich_text)
    ) {
      const slug = getPlainRichText(page.properties.Slug.rich_text);
      pageInfo.slug = slug;
    }

    if (
      page.properties.Page?.type === "title" &&
      Array.isArray(page.properties.Page?.title)
    ) {
      const title = getPlainRichText(page.properties.Page.title);
      pageInfo.title = title;
    }

    if (page.properties.Posted?.type === "date") {
      const date = page.properties.Posted.date?.start;
      pageInfo.date = date;
    }

    if (
      page.properties.Description?.type === "rich_text" &&
      Array.isArray(page.properties.Description?.rich_text)
    ) {
      const description = getPlainRichText(
        page.properties.Description.rich_text,
      );
      pageInfo.description = description;
    }

    if (
      page.properties.ReadTime?.type === "number" &&
      typeof page.properties.ReadTime.number === "number"
    ) {
      pageInfo.readingTime = page.properties.ReadTime.number;
    }

    if (
      page.properties.Words?.type === "number" &&
      typeof page.properties.Words.number === "number"
    ) {
      pageInfo.wordCount = page.properties.Words.number;
    }

    if (page.properties.Banner?.type === "files") {
      page.properties.Banner.files.forEach((file) => {
        pageInfo.banner = file.type === "file" ? file.file.url : undefined;
      });
    }

    if (pageInfo.slug !== "") {
      postInfoList.push(pageInfo);
    }
  }

  return postInfoList;
};

export const getBlogPostsInfo = async () => {
  const blogPosts = await getBlogPosts();
  return getPostsInfo(blogPosts.results);
};

export const getPageMarkdownBySlug = async (slug: string) => {
  const pages = await getBlogPostsInfo();

  const page = pages.find((page) => page.slug === slug);

  if (!page) {
    return null;
  }

  const pageMarkdown = await getPageMarkdown(page.id);

  return n2m.toMarkdownString(pageMarkdown);
};

const getPageMarkdown = async (pageId: string) => {
  return n2m.pageToMarkdown(pageId);
};
