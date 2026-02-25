import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body)
  if (!email || !password) {
    return res.json({
      success: false,
      message: "email or password required",
    });
  }
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });
  if (!user) {
    return res.json({
      success: false,
      message: "user saving error at register",
    });
  }
  res.json({
    success: true,
    message: "user registered successfully",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "email or password required",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      message: "user not registered sign up first",
    });
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res.json({
      success: false,
      message: "wrong password",
    });
  }
  const SECRET = process.env.JWT_SECRET;
  const token = generateToken(user._id, SECRET);
  // console.log(token)
  res.cookie("access", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ⭐ IMPORTANT
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
});
  res.json({
    success: true,
    message: "login successfully",
    user,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("access", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  path: "/",
});

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

export const getMe = (req, res) => {
  return res.json({
    success: true,
    data: req.user,
  });
};
