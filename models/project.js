// - PROJECTS
// 	- id : string
// 	- name : string
// 	- created_at : date
// 	- users : Array of users
// 	- bookmarks : Array of Results
// 	- mindmaps : Array of Mindmaps

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
