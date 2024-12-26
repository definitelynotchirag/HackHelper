import { converttoObjectId } from "@/lib/utils";
import Result from "@/models/result";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse, { params }) => {
  const { id } = params;
  const { result } = await req.json();
  try {
    const objectproject = converttoObjectId(id);
    result["project_id"] = objectproject;
    const bookmark = new Result(result);
    await bookmark.save();
    return NextResponse.json(
      { message: "Bookmark created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Bookmark creation failed" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest, res: NextResponse, { params }) => {
    const { id } = params;
    try {
        const objectproject = converttoObjectId(id);
        const bookmarks = await Result.find({ project_id: objectproject });
        return NextResponse.json({ bookmarks }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
        { message: "Fetching bookmarks failed" },
        { status: 500 }
        );
    }
}

export const DELETE = async (req: NextRequest, res: NextResponse, { params }) => {
    const { id } = params;
    const { bookmarkid } = await req.json();
    try {
        const objectbookmark = converttoObjectId(bookmarkid);
        await Result.findById(objectbookmark).deleteOne();
        return NextResponse.json(
        { message: "Bookmark deleted successfully" },
        { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
        { message: "Deleting bookmark failed" },
        { status: 500 }
        );
    }
}