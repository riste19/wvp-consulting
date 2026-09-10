import { cn } from "@/lib";

/**
 * Stand-in brand lockup.
 *
 * The real WVP logotype is a proprietary asset and is not reproduced here.
 * This type-only placeholder occupies exactly the same box as the original
 * (128×27 in the header, 450×96 in the footer), so dropping in the licensed
 * artwork will not move anything around it.
 */
type LogoPlaceholderProps = {
  variant?: "header" | "footer";
  className?: string;
};

export function LogoPlaceholder({
  variant = "header",
  className,
}: LogoPlaceholderProps) {
  const isFooter = variant === "footer";

  return (
    <span
      className={cn("flex select-none items-center", className)}
      style={{
        width: isFooter ? 450 : 128,
        height: isFooter ? 96 : 27,
        maxWidth: "100%",
      }}
    >
      <span
        className={cn(
          "font-black italic leading-none tracking-tighter",
          isFooter ? "text-white" : "text-primary",
        )}
        style={{ fontSize: isFooter ? 76 : 24 }}
      >
        WVP
      </span>
      <span
        className={cn(
          "ml-1.5 font-bold uppercase leading-[1.05]",
          isFooter ? "ml-4 text-white" : "text-primary",
        )}
        style={{ fontSize: isFooter ? 26 : 7, letterSpacing: "0.02em" }}
      >
        Плус
        <br />
        Консалтинг
      </span>
    </span>
  );
}
