import { Router } from "express";
import { allprodutosPedidos, criarPedido } from "../controllers/pedidos-controller";

const router: Router = Router();

router.post("/pedidos/produtos", criarPedido);
router.get("/pedidos", allprodutosPedidos);

export default router;
