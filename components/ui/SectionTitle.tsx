import { cn } from "../../lib/cn";

type SectionTitleProps = {
  kicker: string;
  title: string;
  align?: "left" | "center";
};

export function SectionTitle({ kicker, title, align = "left" }: SectionTitleProps) {
  return (
    <div data-reveal="hero" className={cn("space-y-3", align === "center" && "text-center")}>
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--accent)] md:text-xs">{kicker}</p>
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <div className={cn("h-px w-12 bg-white/20", align === "center" && "mx-auto")} />
    </div>
  );
}
