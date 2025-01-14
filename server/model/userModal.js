import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const crudSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique:false
  },
  User_name: {
    type: String,
    required: true,
    unique:false
  },
  Email: {
    type: String,
    required: true,
    unique:false
  },
  Address: {
    type: String,
    required: true,
    unique:false
  },
  Desc: {
    type: String,
    required: true,
    unique:false
  },
});
const ProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

ProfileSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
  } catch (err) {
    console.error("JWT token generation error:", err);
    throw err;
  }
};

const User = mongoose.model("User", crudSchema);
export const Profile = mongoose.model("Profile", ProfileSchema);
export default User;
