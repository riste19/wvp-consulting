import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundContent } from "@/components/sections";

/**
 * Becomes the single `404.html` that Cloudflare serves for every missing path
 * in both languages. The chrome is Macedonian; the message itself switches to
 * the language of the address in the browser. See `NotFoundContent`.
 */
export default function NotFound() {
  return (
    <SiteShell locale="mk">
      <NotFoundContent />
    </SiteShell>
  );
}
