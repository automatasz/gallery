import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const getPlainRichText = (richText: RichTextItemResponse[]) => {
  return richText.reduce((prev, curr) => {
    return prev + curr.plain_text;
  }, "");
};
