import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        unique:true
    },
    rating: {
        type:Number,
        required:true,
        default: 0
    }
},
{
    timestamps:true
})



export default mongoose.model("User", userSchema)