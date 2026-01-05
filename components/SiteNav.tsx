import Link from "next/link";

type ActiveKey = "home" | "about" | "resume" | "projects" | "experiences" | "contact";

export default function SiteNav({ active }: { active?: ActiveKey }) {
  const NAV = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Resume", href: "/#resume" },
    { label: "Projects", href: "/project" },
    { label: "Experiences", href: "/experience" },
    { label: "Contact", href: "/#contact" },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-neutral-800/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5">
          <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-[11px] font-semibold tracking-[0.42em] text-white/80">
            {NAV.map((item) => {
              const isActive =
                (active === "about" && item.label === "About") ||
                (active === "resume" && item.label === "Resume") ||
                (active === "projects" && item.label === "Projects") ||
                (active === "experiences" && item.label === "Experiences") ||
                (active === "contact" && item.label === "Contact") ||
                (active === "home" && item.label === "Home");

              // keep your orange highlight behavior (example: About was orange on home)
              const className = isActive
                ? "text-orange-400 hover:text-orange-300"
                : "hover:text-white";

              return (
                <Link key={item.label} href={item.href} className={className}>
                  {item.label.toUpperCase()}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="h-px bg-white/25" />
    </header>
  );
}
