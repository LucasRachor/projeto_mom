import { Router } from "express";
import { allprodutosPedidos, criarPedido, getById } from "../controllers/pedidos-controller";

const router: Router = Router();

router.post("/pedidos/produtos", criarPedido);
router.get("/pedidos", allprodutosPedidos);
router.get("/pedidos/id/:produtoId", getById);

export default router;
