import { Router } from "express";
import { create } from "../controllers/product-controller";

const router: Router = Router();

router.post("/products", create);

export default router;
