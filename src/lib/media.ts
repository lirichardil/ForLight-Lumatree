import fs from "node:fs";
import path from "node:path";

/**
 * Returns the path unchanged if a file actually exists under /public,
 * otherwise undefined. Lets MediaSlot fall back to placeholder art without
 * ever requesting a path we already know is missing.
 */
export function resolvePublicMedia(relativePath: string): string | undefined {
  const abs = path.join(process.cwd(), "public", relativePath);
  return fs.existsSync(abs) ? relativePath : undefined;
}
