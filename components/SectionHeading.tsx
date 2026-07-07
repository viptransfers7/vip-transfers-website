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
      <h2 className={`serif-title mt-4 text-3xl leading-[1.05] sm:text-4xl md:text-6xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {copy ? <p className={`mt-5 text-base leading-7 md:text-lg ${light ? "text-white/68" : "text-neutral-600"}`}>{copy}</p> : null}
    </div>
  );
}
