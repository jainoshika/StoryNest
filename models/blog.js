const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true,
    },
    content: {
        type : String,
        required: true,
    },
    author: {
        type : String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            text: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, {timestamps: true});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;