import mongoose from "mongoose";
import User from "../../auth/schemas/user.schema";

const phoneCallSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },
    duration: {
        type: Number,
        required: false,
        trim: true
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("PhoneCall", phoneCallSchema, "phoneCall_phoneCall");