import { Router } from "express";
import ProductRouter from "./produtos/routes/product-router";
import PedidosRouter from "./pedidos/routes/pedidos-router";

const router: Router = Router();

router.use("/api/", ProductRouter);

router.use("/api/", PedidosRouter);

export default router;