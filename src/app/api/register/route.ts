import { connectDB } from "@/lib/mongodb";
import User from "@/models/user"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  await connectDB();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ isSuccess: false, message: "Email already registered" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ isSuccess: true, message: "User registered", userId: user._id });
}
