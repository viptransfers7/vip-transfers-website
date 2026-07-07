"use client";

export function BookingProgress({ step, steps, onStepClick }: { step: number; steps: string[]; onStepClick: (step: number) => void }) {
  return (
    <div className="border-b hairline bg-white px-3 py-2.5 md:px-6 md:py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-[11px] md:tracking-[0.16em]">
            Step {step + 1} of {steps.length}
          </div>
          <div className="mt-0.5 text-sm font-black md:mt-1 md:text-base">{steps[step]}</div>
        </div>
        <div className="hidden text-right text-xs font-semibold leading-5 text-neutral-500 md:block">3-hour advance booking required</div>
      </div>
      <div className="mt-2.5 h-1 bg-neutral-100 md:mt-3">
        <div className="h-full bg-champagne transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5 md:mt-3 md:gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => onStepClick(index)}
            className={`flex h-8 min-w-0 items-center justify-center gap-2 border px-2 text-[11px] font-black transition md:h-9 md:text-xs ${
              step === index ? "border-champagne bg-ivory text-black" : "hairline bg-white text-neutral-500 hover:text-black"
            }`}
          >
            <span className="hidden sm:inline">{index + 1}</span>
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
