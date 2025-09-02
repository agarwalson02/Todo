import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { GenerateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(3, { message: "Username must be 3 character" })
    .max(20),
  password: z
    .string()
    .min(5, { message: "Password must be 5 character" })
    .max(20),
});

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    //console.log(email, username, password);
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      //return res.status(400).json({ errors: validation.error });
      const errorMessage = validation.error.issues.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hash_pass = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hash_pass });
    await newUser.save();
    if (newUser) {
      const token = await GenerateTokenAndSaveInCookies(newUser._id, res);

      res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = await GenerateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Error logging in user" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Error logging out user" });
  }
};
