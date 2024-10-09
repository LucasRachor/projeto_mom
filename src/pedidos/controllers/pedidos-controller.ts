import { Request, Response, NextFunction } from 'express';
import { criarPedidoProduto, getallPedidosProdutos, formatarPedidosComProdutos, getPedidosById } from '../services/pedidos-service';

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

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const pedidoId = req.params.produtoId
  try {
    const pedidoById = await getPedidosById(pedidoId);

  // Verifique se o pedido foi encontrado
    if (!pedidoById) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Como está buscando apenas um pedido, passe o pedido individual para a função
    const pedidoFormatado = formatarPedidosComProdutos([pedidoById]); // Passa como array de um elemento

    res.status(200).json(pedidoFormatado)
  }catch (error: any) {
    next(error)
    console.log(error)
  }
}