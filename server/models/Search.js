
import mongoose from "mongoose";
export default mongoose.model("Search", new mongoose.Schema({userId:String,term:String,timestamp:Date}));
