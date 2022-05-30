import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;
const tableSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    }, 
    status: {
        type: Number,
        required: true
    },
    timestar: {
        type: Object,
    },
    order: {
        type: [
            Object
        ]
    }
    
}, { timestamps: true});

export default mongoose.model('Table', tableSchema);


