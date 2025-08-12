export const INVERT_DARK_MODE_IMAGE_PATHS: readonly string[] = [
  // Add paths (relative or absolute) for images that should invert in dark mode
  "/assets/articles/slowdeathofwonder/flow.png",
] as const;

export function shouldInvertImage(src?: string | null): boolean {
  if (!src) return false;
  try {
    // Normalize to pathname (strip origin if absolute)
    const url = new URL(src, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const path = url.pathname;
    return INVERT_DARK_MODE_IMAGE_PATHS.some((p) => path.endsWith(p));
  } catch {
    // If not a valid URL, fallback to simple endsWith checks
    return INVERT_DARK_MODE_IMAGE_PATHS.some((p) => src.endsWith(p));
  }
}