import { handleLogin, handleRegister } from "../../services/auth/auth.services.js";

class AuthController {
  async register(req, res) {
    const { status, json } = await handleRegister(req.body);
    return res.status(status).json(json);
  }
  async login(req, res) {
    const { status, json } = await handleLogin(req.body);
    return res.status(status).json(json);
  }
}

export const { login, register } = new AuthController();
