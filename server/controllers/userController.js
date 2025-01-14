import User, { Profile } from "../model/userModal.js";
import bcrypt from "bcrypt";


export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const savedItem = await userData.save();
   res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const ReadAll = async (req, res, next) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({
        message: "User data is empty",
      });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const ReadOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const Update = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.set(req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Profile.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Profile({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = await newUser.generateToken();

    // Set JWT token in a cookie
    res.cookie("jwttoken", token, {
      httpOnly: true,
      withCredential:true
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: token,
    });
  } catch (err) {

    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;

  try { 
    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Username Or Password" });
    }

    const token = await user.generateToken();

    // Set JWT token in a cookie
    res.cookie("authtoken", token, {
      httpOnly: true,
      withCredential:true
    });

    // Send response with login details and token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      id: user._id,
      user: { email: user.email },
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};
