import type { DetailContent } from "../../data/presentationData";
import { cn } from "../../lib/cn";

type StatCardProps = {
  value: string;
  label: string;
  note?: string;
  counter?: number;
  suffix?: string;
  detail?: DetailContent;
  onOpenDetail?: (detail: DetailContent) => void;
};

export function StatCard({ value, label, note, counter, suffix, detail, onOpenDetail }: StatCardProps) {
  const isCounter = counter !== undefined;
  const clickable = Boolean(detail && onOpenDetail);

  const content = (
    <>
      <div className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
        {isCounter ? (
          <span data-counter={counter} data-suffix={suffix ?? ""}>
            0{suffix ?? ""}
          </span>
        ) : (
          value
        )}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{label}</div>
      {note && <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{note}</p>}
      {clickable && (
        <p className="mt-4 text-xs font-medium text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
          Xem chi tiết →
        </p>
      )}
    </>
  );

  const className = cn(
    "surface-card group rounded-2xl p-5 text-left md:p-6",
    clickable && "cursor-pointer",
  );

  if (clickable && detail && onOpenDetail) {
    return (
      <button
        type="button"
        data-reveal="item"
        data-hover="card"
        onClick={() => onOpenDetail(detail)}
        className={className}
      >
        {content}
      </button>
    );
  }

  return (
    <div data-reveal="item" data-hover="card" className={className}>
      {content}
    </div>
  );
}
