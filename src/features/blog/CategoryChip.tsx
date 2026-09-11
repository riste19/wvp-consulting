// Direct path, not the barrel: this component is reachable from the client-side
// `ArticleGrid`, and the barrel would pull the whole article corpus with it.
import { categoryTone } from "@/data/content/categories";
import { cn } from "@/lib";

type CategoryChipProps = {
  category: string;
  className?: string;
};

export function CategoryChip({ category, className }: CategoryChipProps) {
  const accent = categoryTone[category] === "accent";

  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-sm font-medium",
        accent
          ? "bg-chart-2/10 text-chart-2"
          : "bg-muted text-muted-foreground",
        className,
      )}
    >
      {category}
    </span>
  );
}
