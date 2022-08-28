const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title can't be empty!!"]
    },
    note_body:{
        type: String,
        required: [true, "note body can't be empty !!"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
                required: [true, "comment can't be empty !!"]
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Note", noteSchema);