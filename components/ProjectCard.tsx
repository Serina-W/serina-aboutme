"use client";

type Project = {
  id: string;
  projectName: string;
  startDate: string;
  endDate: string | null;
  description: string;
  deploymentLink?: string | null;
  githubLink?: string | null;
};

// Safe formatting (no locale mismatch)
function formatMonthYear(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ProjectCard({ item }: { item: Project }) {
  const range = `${formatMonthYear(item.startDate)} — ${
    item.endDate ? formatMonthYear(item.endDate) : "Present"
  }`;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-white">{item.projectName}</h3>
        <p className="text-xs text-white/50">{range}</p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {item.deploymentLink ? (
          <a
            className="text-orange-300 hover:text-orange-200 underline underline-offset-4"
            href={item.deploymentLink}
            target="_blank"
            rel="noreferrer"
          >
            Deployment
          </a>
        ) : null}

        {item.githubLink ? (
          <a
            className="text-white/70 hover:text-white underline underline-offset-4"
            href={item.githubLink}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}
