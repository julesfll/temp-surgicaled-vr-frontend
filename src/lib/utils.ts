import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export { cva, type VariantProps } from "class-variance-authority";

/**
 * Merge Tailwind-friendly `className` values.
 *
 * Stack (Tailwind v4):
 * - **clsx** — build conditional / list-based class strings
 * - **tailwind-merge** — resolve conflicting utilities (e.g. two paddings)
 * - **this function** — `twMerge(clsx(...))` for every `className` prop
 *
 * **CVA** (`import { cva } from "@/lib/utils"`) — define the design system for a
 * component (base + variants + compound variants). Combine with `cn()` when
 * merging CVA output with user overrides: `className={cn(variants(props), className)}`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
