import { z } from "zod";

// Define a regex for UUIDs (v4)
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Define a regex for image names and extensions
const imageNameRegex = /^[a-zA-Z0-9_-]+$/; // Alphanumeric, underscores, and hyphens
const extensionRegex = /^[a-zA-Z0-9]+$/; // Alphanumeric extensions (e.g., jpg, png, webp)

// Define the URL schema
const urlSchema = z.string().url().refine((url) => {
  try {
    const { pathname } = new URL(url);

    // Split the path into parts
    const parts = pathname.split("/").filter(Boolean); // Remove empty strings

    // Validate the structure
    return (
      parts.length === 3 && // Expecting 3 parts: {uuid}/{uuid}/{imageName}.{extension}
      uuidRegex.test(parts[0] ?? "") && // First UUID
      uuidRegex.test(parts[1] ?? "") && // Second UUID
      imageNameRegex.test(parts[2]?.split(".")[0] ?? "") && // Image name
      extensionRegex.test(parts[2]?.split(".")[1] ?? "") // Extension
    );
  } catch {
    return false; // Invalid URL
  }
}, {
  message: "URL must follow the structure: /{uuid}/{uuid}/{imageName}.{extension}",
}).transform((url) => {
  const { pathname } = new URL(url);

    // Split the path into parts
    const parts = pathname.split("/").filter(Boolean); // Remove empty strings

    // Validate the structure
    return {
      uuid0: parts[0],
      uuid1: parts[1],
      imageName: parts[2]?.split(".")[0],
      extension: parts[2]?.split(".")[1],
    };
});

export function validateImageUrl(url: string) {
  return urlSchema.safeParse(url);
}
