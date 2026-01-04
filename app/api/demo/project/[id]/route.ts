"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseDateOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ status: "error", message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", data: project }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = await req.json();

    const projectName = String(body.projectName ?? "").trim();
    const description = String(body.description ?? "").trim();
    const startDate = parseDateOrNull(body.startDate);
    const endDate = parseDateOrNull(body.endDate);

    const deploymentLink = body.deploymentLink ? String(body.deploymentLink).trim() : null;
    const githubLink = body.githubLink ? String(body.githubLink).trim() : null;

    // PUT = full replace -> require required fields
    if (!projectName || !description || !startDate) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields for PUT: projectName, startDate, description" },
        { status: 400 }
      );
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        projectName,
        description,
        startDate,
        endDate,
        deploymentLink: deploymentLink ?? undefined,
        githubLink: githubLink ?? undefined,
      },
    });

    return NextResponse.json({ status: "success", data: updated }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ status: "success", message: "Deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to delete project" }, { status: 500 });
  }
}
