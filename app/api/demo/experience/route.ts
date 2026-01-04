"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseDateOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json({ status: "success", data: experiences }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = String(body.company ?? "").trim();
    const title = String(body.title ?? "").trim();
    const location = String(body.location ?? "").trim();
    const description = String(body.description ?? "").trim();
    const startDate = parseDateOrNull(body.startDate);
    const endDate = parseDateOrNull(body.endDate);

    if (!company || !title || !location || !description || !startDate) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields: company, title, location, startDate, description" },
        { status: 400 }
      );
    }

    const created = await prisma.experience.create({
      data: {
        company,
        title,
        location,
        description,
        startDate,
        endDate,
      },
    });

    return NextResponse.json({ status: "success", data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to create experience" }, { status: 500 });
  }
}
