
import mongoose from "mongoose";
export default mongoose.model("User", new mongoose.Schema({providerId:String,name:String,provider:String}));
