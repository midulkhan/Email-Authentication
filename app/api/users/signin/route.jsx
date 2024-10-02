import { NextResponse } from "next/server";
import dbConnect from "@/dbConnection/dbConnect";
import User from "@/models/userSchema";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    // DB connection
    dbConnect();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "No User Found" }, { status: 500 });
    }

    const deCryptPassword = await bcryptjs.compare(password, user.password);

    if (!deCryptPassword) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }

    const isVerifiedUser = await user.isVerified;
    if (!isVerifiedUser) {
      return NextResponse.json(
        { message: "user is not verified" },
        { status: 401 }
      );
    }

    const tokenData = {
      id: user._id,
    };

    const Token = jwt.sign(tokenData, process.env.TOKEN, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({ message: "User login successfully" });

    response.cookies.set("token", Token, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
