export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className={`serif-title mt-3 text-[1.65rem] leading-[1.08] sm:text-3xl md:mt-4 md:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {copy ? <p className={`mt-4 text-sm leading-6 md:mt-5 md:text-base md:leading-7 ${light ? "text-white/68" : "text-neutral-600"}`}>{copy}</p> : null}
    </div>
  );
}
