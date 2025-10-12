import { invalidResponse } from "../../utils/index.js";

const isAdmin = (req, res, next) => {
  const userRole = req.user?.role;

  if (!userRole) {
    return res.status(401).json(invalidResponse('Role Not Found!', null));
  }

  if (userRole !== 'admin') {
    return res.status(401).json(invalidResponse('Role Not Authorized!', null));
  }
  next();
};
export { isAdmin };
