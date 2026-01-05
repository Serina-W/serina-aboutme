"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SiteNav from "@/components/SiteNav";

type Project = {
  id: string;
  projectName: string;
  startDate: string;
  endDate: string | null;
  description: string;
  deploymentLink?: string | null;
  githubLink?: string | null;
};

export default function ProjectPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/demo/project");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setItems(json.data ?? []);
      } catch {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav active="projects" />

      <main className="mx-auto max-w-5xl px-4 pb-10 pt-28">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="mt-2 text-sm text-white/60">Things I’ve built.</p>

        {loading ? <p className="mt-8 text-sm text-white/80">Loading...</p> : null}
        {error ? <p className="mt-8 text-sm text-red-400">{error}</p> : null}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
