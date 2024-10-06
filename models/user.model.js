import mongoose from "mongoose";

const userScehma = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        }
    }
)
const User = mongoose.model("User", userScehma)

export default User;