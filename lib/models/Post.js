const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 10,
        maxLength: 100,
    }, // optional, answers do not have titles

    contents: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 1000,
    },

    author: {
        type: String,
        required: true,
        match: /^[a-zA-Z][a-zA-Z\d]*$/,
        minLength: 4,
        maxLength: 20
    },

    reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    likeCount: {
        type: Number,
        required: true,
        default: 0
    },

    created: {
        type: Date,
        required: true,
        default: Date.now
    },

    edited: {
        type: Date,
        required: true,
        default: Date.now
    },

    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('Post', PostSchema);