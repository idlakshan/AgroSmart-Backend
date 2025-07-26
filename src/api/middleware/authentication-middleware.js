import { ApiError } from "../../domain/errors/ApiError.js";

export default function isAuthenticated(req, res, next) {
  const auth = req.auth?.();

  console.log(auth);
  

  if (!auth || !auth.userId) {
    throw new ApiError(401,"Unauthorized");
  }

  next();
}
