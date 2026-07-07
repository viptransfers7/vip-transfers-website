"use client";

export function BookingProgress({ step, steps, onStepClick }: { step: number; steps: string[]; onStepClick: (step: number) => void }) {
  return (
    <div className="border-b hairline bg-white px-4 py-3 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#9a7b41]">
            Step {step + 1} of {steps.length}
          </div>
          <div className="mt-1 text-sm font-black md:text-base">{steps[step]}</div>
        </div>
        <div className="hidden text-right text-xs font-semibold leading-5 text-neutral-500 md:block">3-hour advance booking required</div>
      </div>
      <div className="mt-3 h-1 bg-neutral-100">
        <div className="h-full bg-champagne transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => onStepClick(index)}
            className={`flex h-9 min-w-0 items-center justify-center gap-2 border px-2 text-xs font-black transition ${
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
