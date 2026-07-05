const groups = [
  { title: "Explore", links: ["Health", "Tech", "Mindset", "Lifestyle"] },
  { title: "Systems", links: ["Frameworks", "Daily habits", "Guides", "Case studies"] },
  { title: "About", links: ["The philosophy", "Membership", "Contact", "Archive"] },
];

const FooterEditorial = () => {
  return (
    <footer className="section-x pt-20 pb-10 border-t" style={{ borderColor: "hsl(var(--hairline) / 0.1)" }}>
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#home" className="font-display font-semibold text-2xl tracking-tight">
              GS<span className="text-secondary">Origins</span>
            </a>
            <p className="text-ink-muted leading-relaxed mt-5 max-w-sm">
              A structured knowledge platform for health, mindset, tech and lifestyle
              intelligence. Every scroll, a little more clarity.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="font-display font-medium text-sm tracking-tight mb-4">{g.title}</h4>
                <ul className="flex flex-col gap-3">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a href="#home" className="text-sm text-ink-muted hover:text-foreground transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "hsl(var(--hairline) / 0.1)" }}>
          <p className="text-sm text-ink-muted">© {new Date().getFullYear()} GSOrigins. Built for clarity.</p>
          <p className="text-sm text-ink-muted">Calm intelligence, structured wisdom.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterEditorial;
