import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;
const settingsSchema = new Schema({
    pricePlay: {
        type: Number
    },
    imgTable: {
        type: String
    }
}, { timestamps: true});

export default mongoose.model('Settings',settingsSchema)


