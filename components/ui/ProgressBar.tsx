type ProgressBarProps = {
  label: string;
  value: string;
};

export function ProgressBar({ label, value }: ProgressBarProps) {
  const width = Number.parseFloat(value.replace("%", ""));

  return (
    <div data-reveal="scroll" className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        <span className="text-base font-medium text-[var(--text-primary)] md:text-lg">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div data-progress={width} className="progress-fill h-full w-0 rounded-full" />
      </div>
    </div>
  );
}
