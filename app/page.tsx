import Image from "next/image";

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Resume", id: "resume" },
  { label: "Projects", id: "projects" },
  { label: "Activities", id: "activities" },
  { label: "Contact", id: "contact" },
];

const SKILLS = [
  { name: "MS SUITE", pct: 90 },
  { name: "PYTHON", pct: 90 },
  { name: "JS / TS / REACT", pct: 80 },
  { name: "NODE / EXPRESS", pct: 75 },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Top Nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="bg-neutral-800/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5">
            <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-[11px] font-semibold tracking-[0.42em] text-white/80">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={
                    item.id === "about"
                      ? "text-orange-400 hover:text-orange-300"
                      : "hover:text-white"
                  }
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="h-px bg-white/25" />
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen">
        <div className="absolute inset-0">
        <Image
            src="/hero.jpg"
            alt="Profile"
            fill
            className="object-cover"
            priority
        />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4 pt-34">
          <div className="text-center text-white">
            <p className="text-xs font-semibold tracking-[0.32em] text-white/80">
              HI THERE, THANKS FOR VISITING MY WEBSITE!
            </p>

            <h1 className="mt-10 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Serina Wang
            </h1>

            <p className="mt-6 text-base text-white/85 sm:text-lg">
              Mathematics–Computer Science & Economics Student | Full-Stack Developer | Builder
            </p>

            <div className="mt-10 flex items-center justify-center gap-6 text-white/80">
              {["GH", "IN", "GM",].map((t) => (
                <div
                  key={t}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-sm font-semibold"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/90">
            ↓
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-black text-white">
        <div className="h-px bg-white/15" />

        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.38em] text-orange-400">
              ABOUT
            </p>
            <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Let me introduce myself.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 md:grid-cols-[180px_1fr]">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-36 w-36 overflow-hidden rounded-full ring-2 ring-orange-500/70">
                <Image
                  src="/serinaprofilepic.jpg"
                  alt="Profile"
                  fill
                  className="object-cover object-[50%_15%]"
                  priority
                />
              </div>
            </div>

            <p className="text-base leading-relaxed text-white/65">
              I’m a Mathematics–Computer Science student at UC San Diego interested in
              full-stack development, product engineering, and data-driven systems.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            {/* PROFILE */}
            <div>
              <h3 className="text-sm font-semibold tracking-[0.35em] text-white/85">
                PROFILE
              </h3>

              <p className="mt-5 max-w-xl text-sm text-white/60">

              </p>

              <div className="mt-8 space-y-6 text-sm">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-white/45">
                    FULLNAME
                  </p>
                  <p className="mt-2 text-white/80">Serina Wang</p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-white/45">
                    EMAIL
                  </p>
                  <p className="mt-2 text-white/80">sew008@ucsd.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLACEHOLDER SECTIONS */}
      <SectionShell id="resume" title="Resume" />
      <SectionShell id="projects" title="Projects" />
      <SectionShell id="activities" title="Activities" />
      <SectionShell id="contact" title="Contact" />

      <footer className="bg-black py-10 text-center text-xs text-white/45">
        Edited by Serina Wang
      </footer>
    </div>
  );
}

function SectionShell({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold tracking-[0.38em] text-orange-400">
          {title.toUpperCase()}
        </p>
        <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-sm text-white/60">
          ...
        </p>
      </div>
    </section>
  );
}
