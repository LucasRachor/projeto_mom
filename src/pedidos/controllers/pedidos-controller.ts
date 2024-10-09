import { Request, Response, NextFunction } from 'express';
import { criarPedidoProduto, getallPedidosProdutos, formatarPedidosComProdutos } from '../services/pedidos-service';

// Rota para criar um pedido com produtos
export const criarPedido = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pedido = await criarPedidoProduto(req.body);
    res.status(201).json(pedido); // Retorna o pedido criado
  } catch (error: any) {
    next(error)
  }
};

export const allprodutosPedidos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const results = await getallPedidosProdutos();
        const dados_formatados = formatarPedidosComProdutos(results)
        res.status(200).json(dados_formatados)
    }catch (error: any) {
        next(error);
    }
}