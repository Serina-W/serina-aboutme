"use client";

type Experience = {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
};

function formatMonthYear(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ExperienceCard({ item }: { item: Experience }) {
  const range = `${formatMonthYear(item.startDate)} — ${
    item.endDate ? formatMonthYear(item.endDate) : "Present"
  }`;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-white">{item.company}</h3>
        <p className="text-sm text-white/80">{item.title}</p>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50">
          <span>{item.location}</span>
          <span>•</span>
          <span>{range}</span>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
    </article>
  );
}
