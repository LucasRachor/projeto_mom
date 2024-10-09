import { Router } from "express";
import { create, get } from "../controllers/product-controller";

const router: Router = Router();

router.post("/cadastro/produtos", create);
router.get("/produtos", get);

export default router;
