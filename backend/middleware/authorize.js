import jwt, { decode } from "jsonwebtoken";
export const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(404).json({ message: "unathorized" });
  }
  try {
    const decoded = json.verify(token, process.env.JWT_SECRET);
    console.log(decode);
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
