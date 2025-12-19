import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  email: String,
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);
