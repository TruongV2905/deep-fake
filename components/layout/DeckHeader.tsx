import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import { slides } from "../../data/presentationData";
import { cn } from "../../lib/cn";

type DeckHeaderProps = {
  currentSlide: number;
  autoPlay: boolean;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
  onToggleFullscreen: () => void;
};

const btnClass =
  "rounded-lg border border-white/10 bg-white/5 p-2 text-[var(--text-primary)] transition-colors hover:bg-white/10";

export function DeckHeader({
  currentSlide,
  autoPlay,
  isFullscreen,
  onPrev,
  onNext,
  onToggleAutoPlay,
  onToggleFullscreen,
}: DeckHeaderProps) {
  return (
    <header className="surface fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)] sm:text-[11px]">
            Scientific Presentation
          </p>
          <h1 className="truncate text-sm font-semibold text-[var(--text-primary)]">
            Deepfake & Khủng hoảng niềm tin số
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button data-hover="btn" onClick={onPrev} className={btnClass} aria-label="Slide trước">
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] sm:text-sm">
            {currentSlide + 1}/{slides.length}
          </span>
          <button data-hover="btn" onClick={onNext} className={btnClass} aria-label="Slide tiếp">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            data-hover="btn"
            onClick={onToggleAutoPlay}
            className={cn(btnClass, "bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30")}
            aria-label={autoPlay ? "Tạm dừng" : "Tự động phát"}
          >
            {autoPlay ? <Pause className="h-4 w-4 sm:h-5 sm:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
          <button
            data-hover="btn"
            onClick={onToggleFullscreen}
            className={cn(btnClass, "hidden sm:block")}
            aria-label="Toàn màn hình"
          >
            <Maximize2 className={cn("h-5 w-5", isFullscreen && "opacity-70")} />
          </button>
        </div>
      </div>
    </header>
  );
}
