import { Response, Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { CustomRequest } from "../types/express/index.js";
const router = Router();

router.get("/", authenticate, (req: CustomRequest, res: Response) => {
  return res.json(req.user);
});
export default router;
