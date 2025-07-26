import { ApiError } from "../../domain/errors/ApiError.js";

export default function isAdmin(req, res, next) {
  const auth = req.auth?.();
  const role = auth?.sessionClaims?.metadata?.role;
  console.log(role);
  

  if (role !== "admin") {
    throw new ApiError(403, "Access denied. Admins only.");
  }

  next();
}
