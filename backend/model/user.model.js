import mongoose from "mongoose";
const user_schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token:{
    type:String,
    
  }
});

const user = mongoose.model("User", user_schema);
export default user;
