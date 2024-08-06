import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
    username : String,
    email:String,
    genter:String,
    age:Number,
    password:String,
    createdAt:Date
  });

  const user = mongoose.model("users", userSchema,"users");
  
  export default user;