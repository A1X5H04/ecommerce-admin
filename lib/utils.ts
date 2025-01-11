import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function generateSessionToken() {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return encodeBase32LowerCaseNoPadding(randomBytes);
}
