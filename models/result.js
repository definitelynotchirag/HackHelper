// - RESULTS
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

const resultSchema = new mongoose.Schema({
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

const Result = mongoose.models.Result ||  mongoose.model("Result", resultSchema);

export default Result;
