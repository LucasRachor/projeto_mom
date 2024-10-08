import { Router } from "express";
import { create, get } from "../controllers/product-controller";

const router: Router = Router();

router.post("/products", create);
router.get("/products", get);

export default router;
