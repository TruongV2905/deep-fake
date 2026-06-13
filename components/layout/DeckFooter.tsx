import { Users } from "lucide-react";
import { slides } from "../../data/presentationData";
import { cn } from "../../lib/cn";

type DeckFooterProps = {
  currentSlide: number;
  onGoToSlide: (index: number) => void;
};

export function DeckFooter({ currentSlide, onGoToSlide }: DeckFooterProps) {
  return (
    <footer className="surface fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="hidden items-center gap-2 text-sm text-[var(--text-muted)] md:flex">
          <Users className="h-4 w-4" /> Nhóm RBL level 4 · MLN111
        </div>
        <div className="flex flex-1 justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide}
              data-hover="btn"
              onClick={() => onGoToSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentSlide
                  ? "w-8 bg-[var(--accent)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Đến slide ${i + 1}`}
              aria-current={i === currentSlide ? "true" : undefined}
            />
          ))}
        </div>
        <div className="hidden text-xs text-[var(--text-muted)] lg:block">
          Cuộn · Space · ← → · F
        </div>
      </div>
    </footer>
  );
}
