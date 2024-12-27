import { NextResponse, NextRequest } from "next/server";
import Project from "@/models/project";
import { currentUser } from "@clerk/nextjs/server";
import { converttoObjectId } from "@/lib/utils";
import mongoose from "mongoose";
import User from "@/models/user";
import dbConnect from "@/lib/db";

// get project info
export const GET = async (
  req: NextRequest,
  res: NextResponse,
  { params }: { params: Promise<{ id: string }> }
) => {
  dbConnect();
  const { id } = await params;
  try {
    const project = await Project.findById(id);
    return NextResponse.json({ project }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Getting Project info failed" },
      { status: 500 }
    );
  }
};

// add user to project
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  dbConnect();
  try {
    const { userid } = await req.json();
    const { id } = await params;
    const project_id = id;
    console.log(project_id);
    const project = await Project.findById(project_id);
    console.log(project.name);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    if (project.users.includes(userid)) {
      return NextResponse.json(
        { message: "User already in project" },
        { status: 400 }
      );
    }

    await Project.findByIdAndUpdate(
      project_id,
      { $push: { users: userid } },
      { new: true }
    );

    return NextResponse.json(
      { message: "User added to project successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding user to project:", err);
    return NextResponse.json(
      { message: "Adding user to project failed" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  dbConnect();
  const { userid, project_id } = await req.json();
  const id = project_id;
  console.log(id);
  const currentuser = await currentUser();
  const currentuserid = currentuser?.id;
  try {
    const project = await Project.findById(id);
    const owner = await User.findOne({ _id: project.owner });
    const ownerclerkid = owner?.clerkUserId;
    if (currentuserid.toString() !== ownerclerkid.toString()) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }

    await Project.findByIdAndUpdate(
      id,
      { $pull: { users: userid } },
      { new: true }
    );

    return NextResponse.json(
      { message: "User removed from project successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error removing user from project:", err);
    return NextResponse.json(
      { message: "Removing user from project failed" },
      { status: 500 }
    );
  }
};
