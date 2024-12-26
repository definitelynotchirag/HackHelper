import { NextResponse, NextRequest } from "next/server";
import Project from "@/models/project";
import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/user";
import { converttoObjectId } from "@/lib/utils";
import dbConnect from "@/lib/db";

// create project
export const POST = async (req: NextRequest, res: NextResponse) => {
  dbConnect();
  const { name } = await req.json();
  const clerkuser = await currentUser();
  const user = await User.findOne({
    email: clerkuser?.emailAddresses[0].emailAddress,
  });
  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }
  try {
    const newProject = new Project({
      name: name,
      owner: user._id,
      users: [user._id],
    });
    await newProject.save();
    return NextResponse.json(
      { message: "Project created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Project creation failed" },
      { status: 500 }
    );
  }
};

// get projects
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const user = await currentUser();
    const clerkid = user.id;
    const userid = await User.findOne({ clerkUserId: clerkid });
    const projects = await Project.find({ users: userid });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Fetching projects failed" },
      { status: 500 }
    );
  }
};
