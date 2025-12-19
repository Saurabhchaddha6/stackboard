import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  designation: String,
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
