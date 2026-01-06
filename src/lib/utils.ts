import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmbedUrl(url: string): string | null {
  if (!url) return null;

  // Handle standard watch URLs (youtube.com/watch?v=ID)
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/").split("&")[0];
  }

  // Handle short URLs (youtu.be/ID)
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // Handle existing embed URLs
  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  return url;
}
