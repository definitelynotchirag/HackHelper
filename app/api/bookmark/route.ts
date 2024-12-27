import dbConnect from "@/lib/db";
import { converttoObjectId } from "@/lib/utils";
import Bookmark from "@/models/bookmark";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  const { result, project_id } = await req.json();
  try {
    const objectproject = converttoObjectId(project_id);
    result["project_id"] = objectproject;
    const bookmark = new Bookmark(result);
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

export const DELETE = async (req: NextRequest) => {
  await dbConnect();
  const { bookmark_id } = await req.json();
  try {
    await Bookmark.findById(bookmark_id).deleteOne();
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
};

// {
//   "id": 163915909,
//   "name": "_NukeMods",
//   "desc": "pipeline tools for home and studio",
//   "repoLink": "https://github.com/keymixcookbook/_NukeMods",
//   "createdAt": "2019-01-03T02:57:39Z",
//   "stars": 13,
//   "forks": 2,
//   "language": "Python",
//   "author": {
//     "authorAvatar": "https://avatars.githubusercontent.com/u/31866946?v=4",
//     "authorUname": "@keymixcookbook",
//     "authorProfile": "https://github.com/keymixcookbook"
//   },
//   "topics": [
//     "No topics"
//   ]
// }
