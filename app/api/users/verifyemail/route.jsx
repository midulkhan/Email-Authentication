import dbConnect from "@/dbConnection/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userSchema";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Verification failed" },
        { status: 500 }
      );
    }

    (user.isVerified = true),
      (user.verifyToken = undefined),
      (user.verifyTokenExpiry = undefined);

    await user.save();
    return NextResponse.json(
      { message: "user has been verified", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
