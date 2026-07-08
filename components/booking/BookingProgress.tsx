"use client";

export function BookingProgress({ step, steps, onStepClick, onBack }: { step: number; steps: string[]; onStepClick: (step: number) => void; onBack: () => void }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4 md:mb-7">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        aria-label="Go back"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border hairline bg-white text-lg font-semibold text-ink shadow-[0_4px_16px_rgba(10,10,11,.04)] disabled:opacity-35"
      >
        {"<"}
      </button>
      <div className="flex min-w-0 items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => onStepClick(index)}
              aria-current={step === index ? "step" : undefined}
              className={`h-2 rounded-full transition ${step === index ? "w-6 bg-ink" : step > index ? "w-2 bg-ink" : "w-2 bg-[#e1dbd0]"}`}
              aria-label={`Go to ${label}`}
            />
          ))}
        </div>
        <div className="truncate text-xs font-semibold text-neutral-500">
          Step {step + 1} <span className="text-neutral-300">/</span> <span className="font-black text-ink">{steps[step]}</span>
        </div>
      </div>
      <a href="/contact" className="text-sm font-bold text-neutral-600 transition hover:text-ink">
        Help
      </a>
    </div>
  );
}
