const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        match: /^[a-zA-Z][a-zA-Z\d]*$/,
        minLength: 4,
        maxLength: 20
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

LikeSchema.index({ post: 1, user: 1 }, { unique: true });

const Like = mongoose.model('Like', LikeSchema);
module.exports = { Like };