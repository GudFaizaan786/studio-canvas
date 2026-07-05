import Reveal from "./Reveal";

const frameworks = [
  { n: "01", title: "The Clarity Loop", body: "Capture, structure, review. A weekly rhythm that keeps your mind uncluttered and your priorities honest." },
  { n: "02", title: "Energy over Time", body: "Design your day around energy states instead of hours. Match hard work to peaks, recovery to troughs." },
  { n: "03", title: "Environment Design", body: "Make the right action the easy one. Shape defaults so discipline stops being a daily battle." },
  { n: "04", title: "Signal vs Noise", body: "A filter for information, tools and habits — keep what compounds, cut what merely stimulates." },
];

const FrameworksSection = () => {
  return (
    <section id="frameworks" className="section-x section-y">
      <div className="container-editorial">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <p className="kicker mb-4">Life frameworks</p>
            <h2 className="font-display font-semibold display-tight text-4xl sm:text-5xl lg:text-[3.5rem]">
              Mental models you can actually run.
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {frameworks.map((f, i) => (
            <Reveal key={f.n} delay={(i % 2) * 0.1}>
              <div className="border-t pt-6" style={{ borderColor: "hsl(var(--hairline) / 0.12)" }}>
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-sm text-secondary font-medium">{f.n}</span>
                  <div>
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight">{f.title}</h3>
                    <p className="text-ink-muted text-lg leading-relaxed mt-4 max-w-md">{f.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <blockquote className="mt-24 max-w-4xl mx-auto text-center">
            <p className="font-display font-medium display-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
              “You do not rise to the level of your goals. You fall to the level of your systems.”
            </p>
            <footer className="mt-8 text-ink-muted text-sm uppercase tracking-[0.18em]">
              The GSOrigins principle
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
};

export default FrameworksSection;
