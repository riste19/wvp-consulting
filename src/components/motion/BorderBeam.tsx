/**
 * A soft red light that continuously travels around the host element's rounded
 * border. Purely decorative and CSS-driven; a two-layer mask keeps only the
 * 1px border ring visible. See `.border-beam` in `globals.css`.
 *
 * The host element must be positioned and carry its own border radius.
 */
type BorderBeamProps = {
  /** Loop duration. Longer values read as calmer. */
  duration?: string;
  /** Offset so neighbouring cards are not in lockstep. */
  delay?: string;
};

export function BorderBeam({ duration = "30s", delay = "0s" }: BorderBeamProps) {
  return (
    <span aria-hidden className="border-beam">
      <span
        className="border-beam__light"
        style={{ animationDuration: duration, animationDelay: delay }}
      />
    </span>
  );
}
