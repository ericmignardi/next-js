// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    message: "Hello World",
    data: body,
  });
};

export const GET = async (request: NextRequest) => {
  return NextResponse.json({ success: true, message: "Hello World" });
};
