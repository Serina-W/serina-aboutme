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
    const projects = await prisma.project.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json({ status: "success", data: projects }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const projectName = String(body.projectName ?? "").trim();
    const description = String(body.description ?? "").trim();
    const startDate = parseDateOrNull(body.startDate);
    const endDate = parseDateOrNull(body.endDate);

    const deploymentLink = body.deploymentLink ? String(body.deploymentLink).trim() : null;
    const githubLink = body.githubLink ? String(body.githubLink).trim() : null;

    if (!projectName || !description || !startDate) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields: projectName, startDate, description" },
        { status: 400 }
      );
    }

    const created = await prisma.project.create({
      data: {
        projectName,
        description,
        startDate,
        endDate,
        deploymentLink: deploymentLink ?? undefined,
        githubLink: githubLink ?? undefined,
      },
    });

    return NextResponse.json({ status: "success", data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ status: "error", message: "Failed to create project" }, { status: 500 });
  }
}
