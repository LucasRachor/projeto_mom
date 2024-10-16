import { Request, Response, NextFunction } from "express";
import {
    criarProduto,
} from "../services/product-service";

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await criarProduto({
            descricao_produto: req.body.descricao_produto,
            nome_produto: req.body.nome_produto,
            fornecedor: req.body.fornecedor,
            qty_em_estoque: req.body.qty_em_estoque
        });
        res.status(201).json({
            message: "Produto cadastrado com sucesso!",
        });

    } catch (error: any) {
        next(error);
    }
};
