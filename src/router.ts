import { Router } from "express";
import ProductRouter from "./produtos/routes/product-router";

const router: Router = Router();

router.use("/api/", ProductRouter);

export default router;