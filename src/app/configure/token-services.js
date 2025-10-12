import { compare, genSaltSync, hash } from "bcrypt";
import jwtPkg from "jsonwebtoken";
const { sign, verify } = jwtPkg;
import { envSaltRounds, envToken, envTokenDuration } from "../../config/index.js";

class TokenServices {
  async createHash(text = "") {
    const saltRounds = genSaltSync(Number(envSaltRounds));
    return await hash(text, saltRounds);
  }

  async verifyHash(hashText = "", plainText = "") {
    return await compare(plainText, hashText);
  }

  createToken(payload = {}) {
    return sign(payload, envToken, { expiresIn: envTokenDuration });
  }

  async verifyToken(token = "") {
    try {
      const payload = verify(token, envToken);
      return { isValid: true, payload };
    } catch {
      return { isValid: false, payload: null };
    }
  }
}

export const { createHash, verifyHash, createToken, verifyToken } =
  new TokenServices();
