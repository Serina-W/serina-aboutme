"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseDateOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: params.id },
    });

    if (!experience) {
      return NextResponse.json({ status: "error", message: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", data: experience }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const company = String(body.company ?? "").trim();
    const title = String(body.title ?? "").trim();
    const location = String(body.location ?? "").trim();
    const description = String(body.description ?? "").trim();
    const startDate = parseDateOrNull(body.startDate);
    const endDate = parseDateOrNull(body.endDate);

    // PUT = full replace -> require required fields
    if (!company || !title || !location || !description || !startDate) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields for PUT: company, title, location, startDate, description" },
        { status: 400 }
      );
    }

    const updated = await prisma.experience.update({
      where: { id: params.id },
      data: { company, title, location, description, startDate, endDate },
    });

    return NextResponse.json({ status: "success", data: updated }, { status: 200 });
  } catch (e: any) {
    // If id doesn't exist, Prisma throws
    return NextResponse.json({ status: "error", message: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.experience.delete({ where: { id: params.id } });
    return NextResponse.json({ status: "success", message: "Deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to delete experience" }, { status: 500 });
  }
}
