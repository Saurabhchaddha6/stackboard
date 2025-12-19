import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  await dbConnect();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const data = await req.json();
  const project = await Project.create(data);
  return NextResponse.json(project);
}
