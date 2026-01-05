"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="text-sm font-semibold">Serina Wang</div>
        <div className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/experience">
            Experience
          </Link>
          <Link className="hover:underline" href="/project">
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}
