import mongoose from "mongoose";
const Scheme = mongoose.Schema;

const userScheme = new Scheme({
    fullName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
}, {
    timestamps: true,
});

const User = mongoose.model('User', userScheme);
export default User;