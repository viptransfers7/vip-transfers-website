"use client";

export function BookingProgress({ step, steps, onStepClick }: { step: number; steps: string[]; onStepClick: (step: number) => void }) {
  return (
    <div className="border-b hairline bg-[#fbfaf6] px-3 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-[11px] md:tracking-[0.16em]">
            Step {step + 1} of {steps.length}
          </div>
          <div className="mt-0.5 text-sm font-black md:mt-1 md:text-base">{steps[step]}</div>
        </div>
        <div className="hidden text-right text-xs font-semibold leading-5 text-neutral-500 md:block">3-hour advance booking required</div>
      </div>
      <div className="mt-2.5 h-1 overflow-hidden bg-neutral-100 md:mt-3">
        <div className="h-full bg-champagne transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="mt-3 flex items-center">
        {steps.map((label, index) => {
          const isActive = step === index;
          const isDone = step > index;

          return (
            <div key={label} className="flex min-w-0 flex-1 items-center last:flex-none">
              <button
                type="button"
                onClick={() => onStepClick(index)}
                aria-current={isActive ? "step" : undefined}
                className={`flex min-w-0 items-center gap-2 text-left transition ${isActive ? "text-black" : "text-neutral-500 hover:text-black"}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                    isActive || isDone ? "bg-black text-white" : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden truncate text-xs font-black sm:block">{label}</span>
              </button>
              {index < steps.length - 1 ? <div className={`mx-2 h-px flex-1 ${isDone ? "bg-black" : "bg-neutral-200"}`} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
