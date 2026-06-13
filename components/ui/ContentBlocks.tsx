import type { ReactNode, RefObject } from "react";
import type { DetailContent } from "../../data/presentationData";
import { cn } from "../../lib/cn";

type ResearchCardProps = {
  index: number;
  detail: DetailContent;
  onOpenDetail: (detail: DetailContent) => void;
};

export function ResearchCard({ index, detail, onOpenDetail }: ResearchCardProps) {
  return (
    <button
      type="button"
      data-reveal="item"
      data-hover="card"
      onClick={() => onOpenDetail(detail)}
      className="surface-card group rounded-2xl p-5 text-left sm:p-6"
    >
      <div className="mb-5 text-3xl font-light text-white/15 sm:text-4xl">0{index + 1}</div>
      <h3 className="text-base font-medium text-[var(--text-primary)] sm:text-lg">{detail.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{detail.body}</p>
      <p className="mt-4 text-xs font-medium text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
        Xem chi tiết →
      </p>
    </button>
  );
}

type QuoteBlockProps = {
  children: ReactNode;
  className?: string;
};

export function QuoteBlock({ children, className }: QuoteBlockProps) {
  return (
    <blockquote
      data-reveal="item"
      className={cn(
        "surface-elevated rounded-2xl border-l-2 border-[var(--accent)] px-6 py-5 text-base leading-relaxed text-[var(--text-primary)] sm:px-8 sm:py-6 sm:text-lg",
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

type HeroImageProps = {
  src: string;
  alt: string;
  caption?: string;
  imageRef?: RefObject<HTMLDivElement | null>;
};

export function HeroImage({ src, alt, caption, imageRef }: HeroImageProps) {
  return (
    <div ref={imageRef} data-reveal="image" className="relative overflow-hidden rounded-2xl">
      <img src={src} alt={alt} className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] lg:aspect-square" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p className="text-sm font-medium text-white/90 sm:text-base">{caption}</p>
        </div>
      )}
    </div>
  );
}
