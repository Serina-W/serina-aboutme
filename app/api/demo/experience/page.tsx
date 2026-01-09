"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";

type Experience = {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
};

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/experience");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setItems(json.data ?? []);
      } catch {
        setError("Failed to load experience.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Experience</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Roles and work I’ve done recently.
      </p>

      {loading ? <p className="mt-8 text-sm">Loading...</p> : null}
      {error ? <p className="mt-8 text-sm text-red-600">{error}</p> : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
