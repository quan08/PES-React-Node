import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;
const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number
    },
    img: {
        type: String,
    }
}, { timestamps: true});

export default mongoose.model('Menu', menuSchema);


