// import { Schema } from "mongoose";
import mongoose, { mongo, Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId,  //onw to whom "subcriber"
        ref: "User"
    },
    



}, { timestamps: true })



export const Subscription = mongoose.model("Subscription", subscriptionSchema)