import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { DetailContent } from "../data/presentationData";
import { animateDetailClose, animateDetailOpen } from "../animations/useGsapAnimations";
import { cn } from "../lib/cn";

type DetailPanelProps = {
  detail: DetailContent | null;
  onClose: () => void;
};

export function DetailPanel({ detail, onClose }: DetailPanelProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  useEffect(() => {
    if (!detail) return;
    closing.current = false;
    animateDetailOpen(backdropRef.current, panelRef.current);
  }, [detail]);

  const handleClose = () => {
    if (closing.current || !detail) return;
    closing.current = true;
    animateDetailClose(backdropRef.current, panelRef.current, onClose);
  };

  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={handleClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        className="surface-elevated relative w-full max-w-lg rounded-2xl p-6 sm:p-8"
      >
        <button
          data-hover="btn"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--text-primary)]"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        {detail.metric && (
          <p className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{detail.metric}</p>
        )}
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          {detail.subtitle ?? "Chi tiết"}
        </p>
        <h3 id="detail-title" className="mt-3 text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
          {detail.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">{detail.body}</p>
        <button
          data-hover="btn"
          onClick={handleClose}
          className={cn(
            "mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium",
            "text-[var(--text-primary)] transition-colors hover:bg-white/10",
          )}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
