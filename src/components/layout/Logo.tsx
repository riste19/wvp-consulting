import Image from "next/image";

// Direct path, not the barrel: the header that renders this is a client component.
import { images, imageSizes } from "@/data/site/images";

type LogoProps = {
  /** 128×27 in the header, 450×96 in the footer. */
  variant?: "header" | "footer";
  /** White for dark or photographic backgrounds. */
  tone?: "color" | "white";
  /** Leave empty when a surrounding link already names the logo. */
  alt?: string;
};

/**
 * The firm's logotype. It is the Macedonian lockup (ВФП ПЛУС КОНСАЛТИНГ) in
 * every language, as on the previous site.
 */
export function Logo({ variant = "header", tone = "color", alt = "" }: LogoProps) {
  const isFooter = variant === "footer";
  const white = tone === "white";

  return (
    <Image
      src={white ? images.logoWhite : images.logo}
      alt={alt}
      width={white ? imageSizes.logoWhite.width : imageSizes.logo.width}
      height={white ? imageSizes.logoWhite.height : imageSizes.logo.height}
      priority={!isFooter}
      className={isFooter ? "h-auto w-[450px] max-w-full" : "h-[27px] w-auto"}
    />
  );
}
