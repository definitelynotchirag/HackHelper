import dbConnect from "@/lib/db";
import { converttoObjectId } from "@/lib/utils";
import Bookmark from "@/models/bookmark";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ project_id: string }> }
) => {
  await dbConnect();
  const { project_id } = await params;
  try {
    const bookmarks = await Bookmark.find({ project_id: project_id });
    console.log(bookmarks);
    return NextResponse.json({ bookmarks }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Fetching bookmarks failed" },
      { status: 500 }
    );
  }
};
