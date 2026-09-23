import Link from "next/link";

type BookMeetingTabProps = {
  href: string;
  /** Two short lines, stacked. */
  lines: string[];
};

/**
 * Floating appointment shortcut pinned to the right edge of the services page.
 * Hidden on small screens, where it would sit on top of the content.
 */
export function BookMeetingTab({ href, lines }: BookMeetingTabProps) {
  return (
    <Link
      href={href}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 rounded-lg bg-primary px-5 py-3 text-center text-xs font-bold uppercase leading-tight tracking-wide text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover md:block"
    >
      {lines[0]}
      <br />
      {lines[1]}
    </Link>
  );
}
