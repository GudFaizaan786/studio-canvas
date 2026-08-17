const partners = [
  "TU Delft Circular Lab",
  "NordWaste Group",
  "Helios Materials",
  "City of Rotterdam",
  "BioForge Institute",
  "Vertex Robotics",
];

const TrustStrip = () => (
  <section aria-label="Research and industry partners" className="border-y border-border/70 bg-card/40 py-8">
    <div className="section-shell">
      <p className="text-center text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        Building alongside research institutes, cities and industrial operators
      </p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="whitespace-nowrap font-display text-sm font-medium tracking-wide text-muted-foreground/80"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrustStrip;
