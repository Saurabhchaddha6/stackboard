import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();
  await Subscription.create({ email });
  return NextResponse.json({ success: true });
}

export async function GET(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const subs = await Subscription.find().sort({ createdAt: -1 });
  return NextResponse.json(subs);
}
