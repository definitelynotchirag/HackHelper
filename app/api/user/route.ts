import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import { currentUser } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import dbConnect from "./../../../lib/db.js";

const converttoObjectId = (id: string) => {
  const newid = new mongoose.Types.ObjectId(id);
  return newid;
};

export async function POST(request: NextRequest, response: NextResponse) {
  dbConnect();
  try {
    const { firstName, email } = await request.json();
    const clerkuser = await currentUser();
    const userid = clerkuser.id;
    console.log(clerkuser?.firstName);
    const newUser = new User({
      clerkUserId: userid,
      firstName: clerkuser.firstName,
      email: clerkuser.emailAddresses[0].emailAddress,
    });
    await newUser.save();
    console.log(newUser);
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "User creation failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Fetching users failed" },
      { status: 500 }
    );
  }
}
