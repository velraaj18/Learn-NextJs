import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectDB();

  const user = await User.findOne({email});

  if (!user) {
    return NextResponse.json({ isSuccess : false, message: "Invalid Credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({isSuccess : false,  message: "Invalid credentials" }, { status: 401 });
  }
  
  return NextResponse.json({isSuccess : true,  message: "Login successful", userId: user._id });
}
