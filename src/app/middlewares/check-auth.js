import { invalidResponse } from "../../utils/index.js";
import jwt from "jsonwebtoken";
import { envToken } from "../../config/index.js";

export const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(invalidResponse("Token missing!", null));
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, envToken, (err, payload) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res
          .status(401)
          .json(invalidResponse("Token invalid or expired!", null));
      }

      req.user = payload;
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json(invalidResponse("Authentication failed!", null));
  }
};
