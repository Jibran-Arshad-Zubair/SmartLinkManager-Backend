import { PrismaClient } from "@prisma/client";
import { createHash, verifyHash, createToken } from "../../configure/token-services.js";
import { successfulResponse, invalidResponse } from "../../../utils/index.js";
const prisma = new PrismaClient();
class AuthServices {
  async handleRegister(body) {
   
    try {
      const { username, email, password, role } = body;

      if (!username || !email || !password) {
        return {
          status: 400,
          json: invalidResponse("Please provide username, email, and password."),
        };
      }
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email.trim() },
            { username: username.toLowerCase() },
          ],
        },
      });

      if (existingUser) {
        return {
          status: 400,
          json: invalidResponse("Email or Username already exists!"),
        };
      }

      const passwordHash = await createHash(password.trim());
      const user = await prisma.user.create({
        data: {
          username: username.toLowerCase(),
          email: email.trim(),
          password: passwordHash,
          role: role || "user",
        },
      });
      const { password: _, ...userData } = user;

      return {
        status: 201,
        json: successfulResponse("User registered successfully!", { user: userData }),
      };
    } catch (e) {
      console.error("Register Error:", e);
      return { status: 500, json: invalidResponse(e.message) };
    }
  }
  async handleLogin(body) {
    try {
      const { email, password } = body;

      if (!email || !password) {
        return {
          status: 400,
          json: invalidResponse("Please provide email and password."),
        };
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return { status: 400, json: invalidResponse("User not found!") };
      }
      const isPasswordValid = await verifyHash(user.password, password);
      if (!isPasswordValid) {
        return {
          status: 400,
          json: invalidResponse("Invalid email or password."),
        };
      }

      const payload = { id: user.id, role: user.role };
      const token = createToken(payload);
      const { password: _, ...userData } = user;

      return {
        status: 200,
        json: successfulResponse("Login successful!", { token, user: userData }),
      };
    } catch (e) {
      console.error("Login Error:", e);
      return { status: 500, json: invalidResponse(e.message) };
    }
  }
}

export const { handleLogin, handleRegister } = new AuthServices();
