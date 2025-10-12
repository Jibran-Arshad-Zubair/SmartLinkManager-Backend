import { add, getAll, getById, update, remove } from "../../app/controllers/site/site.controller.js";
import { isAuth } from "../../app/middlewares/check-auth.js";
import { isAdmin } from "../../app/middlewares/is-admin.js";
import { AsyncTryCatch, router as SiteRouter } from "../../utils/index.js";

const url = "";
const appendUrl = (segment) => `${url}/${segment}`;

SiteRouter.post(appendUrl("sites"), isAuth, isAdmin ,AsyncTryCatch(add));
SiteRouter.get(appendUrl("sites"), AsyncTryCatch(getAll));
SiteRouter.get(appendUrl("sites/:id"), AsyncTryCatch(getById));
SiteRouter.put(appendUrl("sites/:id"), isAuth, isAdmin, AsyncTryCatch(update));
SiteRouter.delete(appendUrl("sites/:id"), isAuth, isAdmin, AsyncTryCatch(remove));

export default SiteRouter;
