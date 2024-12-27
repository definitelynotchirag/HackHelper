// - BOOKMARKS
// 	- id: string;
// 	- name: string;
// 	- desc: string;
//     - repoLink: string;
//     - createdAt: string;
//     - stars: number;
//     - forks: number;
//     - language: string;
// 	-     author: {
//       authorAvatar: string;
//       authorUname: string;
//       authorProfile: string;
// 	 };
//     - topics: String[];

import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    project_id : { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    repoLink: { type: String, required: true },
    createdAt: { type: String, required: true },
    stars: { type: Number, required: true },
    forks: { type: Number, required: true },
    language: { type: String, required: true },
    author :{
        authorAvatar: { type: String, required: true },
        authorUname: { type: String, required: true },
        authorProfile: { type: String, required: true },
    },
    topics: { type: Array, required: true }
});

const Bookmark = mongoose.models.Bookmark ||  mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
