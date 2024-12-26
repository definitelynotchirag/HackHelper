// - CHATS
// 	- id : string
// 	- user_id : string
// 	- project_id : string
// 	- timestamp : date
// 	- message_content : string
// 	- message_type : bot, user

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  timestamp: { type: Date, required: true },
  message_content: { type: String, required: true },
  message_type: { type: String, required: true },
});


const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);