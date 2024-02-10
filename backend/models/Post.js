import mongoose from "mongoose";
const Scheme = mongoose.Schema;

const postScheme = new Scheme({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: String,
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postScheme);
export default Post;