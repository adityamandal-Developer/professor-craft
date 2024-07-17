const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userInfo: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        PhoneNo: {
            type: String,
            required: false,
        },
        designation: {
            type: String,
            required: false,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    varified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["admin", "professor"],
        default: "professor",
    },
    department: [
        {
            type: String,
        },
    ],
    meetings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meeting",
        },
    ],
});

const User = mongoose.model("User", userSchema);

module.exports.User = User