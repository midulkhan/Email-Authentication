import dbConnect from "@/dbConnection/dbConnect";
import User from "@/models/userSchema";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/app/helpers/mailer";
import { v4 as uuidv4 } from "uuid";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 500 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const Token = uuidv4();

    await sendEmail(email, Token);

    const NewUser = await new User({
      username,
      email,
      password: hashPassword,
      verifyToken: Token,
      verifyTokenExpiry: Date.now() + 3600000,
    });

    const saveUser = await NewUser.save();
    console.log(saveUser);
    return NextResponse.json({ message: "user has been registered" });
  } catch (error) {
    return NextResponse.json(
      { message: "something", error: error.message },
      { status: 500 }
    );
  }
}
