// - MINDMAPS
// 	- id: string
// 	- created_at: date
// 	- type: 1,2,3,4
// 	- map: string

import mongoose from "mongoose";

const mindmapSchema = new mongoose.Schema({
  created_at: { type: Date, required: true },
  type: { type: Number, required: true },
  map: { type: String, required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

const Mindmap = mongoose.models.Mindmap || mongoose.model("Mindmap", mindmapSchema);

export default Mindmap;
