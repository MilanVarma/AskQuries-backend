import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    firstname:String,
    lastname:String,
    profilephoto:String,
    email:String,
    username:String,
    password:String
})

const User = mongoose.model("Users",UserModel)
export default User;