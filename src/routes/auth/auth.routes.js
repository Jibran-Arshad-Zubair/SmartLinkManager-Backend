import { login, register } from "../../app/controllers/auth/auth.controller.js";
import { AsyncTryCatch, router as AuthRouter } from "../../utils/index.js";
const url = "";
const appendUrl = (segment) => `${url}/${segment}`;
AuthRouter.post(appendUrl("signup"), AsyncTryCatch(register));
AuthRouter.post(appendUrl("login"), AsyncTryCatch(login));

export default AuthRouter;

