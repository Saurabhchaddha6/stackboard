import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  await Contact.create(data);
  return NextResponse.json({ success: true });
}

export async function GET(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json(contacts);
}
