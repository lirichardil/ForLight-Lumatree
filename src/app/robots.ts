import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Already prerendered; stated explicitly so STATIC_EXPORT builds accept it. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
