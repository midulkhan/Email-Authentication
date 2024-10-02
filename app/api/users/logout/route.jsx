import { NextResponse } from "next/server";

export function POST(request) {
  const response = NextResponse.json(
    { message: "User logout successfully" },
    { status: 200 }
  );
  response.cookies.delete("token");
  return response;
}
