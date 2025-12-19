import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Client from "@/models/Client";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  await dbConnect();
  const clients = await Client.find();
  return NextResponse.json(clients);
}

export async function POST(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const data = await req.json();
  const client = await Client.create(data);
  return NextResponse.json(client);
}
