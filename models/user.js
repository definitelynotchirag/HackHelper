import mongoose from "mongoose";


// - USER
// 	- id : string
// 	- firstname : string
// 	- email : string

const userSchema = new mongoose.Schema({
  clerkUserId : { type: String, required: true, unique:true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique:true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
