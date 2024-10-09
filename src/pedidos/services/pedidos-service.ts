import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const criarPedidoProduto = async (dadosPedido) => {
  const { clienteId, metodo_pagamento, status, produtos } = dadosPedido;

  // Buscar os detalhes de cada produto, incluindo o preço
  const produtoIds = produtos.map((produto) => produto.produtoId);
  const produtosDoBanco = await prisma.produtos.findMany({
    where: {
      id: { in: produtoIds },
    },
  });

  // Calcular o preço total do pedido
  let preco_total = 0;
  produtos.forEach((produto) => {
    const produtoDoBanco = produtosDoBanco.find((p) => p.id === produto.produtoId);
    if (produtoDoBanco) {
      preco_total += produtoDoBanco.preco_unitario * produto.qtd_produto;
    }
  });

  // Criar o pedido com o preço total calculado
  return await prisma.pedidos.create({
    data: {
      clienteId: clienteId,
      preco_total: preco_total,
      metodo_pagamento: metodo_pagamento,
      status: status,
      pedidos_produtos: {
        create: produtos.map((produto) => ({
          qtd_produto: produto.qtd_produto,
          produtoId: produto.produtoId,
        })),
      },
    },
    include: {
      pedidos_produtos: true, // Inclui os produtos vinculados no pedido
    },
  });
};

export const getallPedidosProdutos = async () => {
    const resultados = await prisma.pedidos.findMany({
        include: {
            pedidos_produtos: {
                include: {
                    produtos: {
                        select: {
                            nome_produto: true,
                            preco_unitario: true
                        }
                    }
                }
            }
        }
    });
    return resultados;
}

export const formatarPedidosComProdutos = (pedidos: any[]) => {
    return pedidos.map(pedido => ({
        id_pedido: pedido.id,
        id_cliente: pedido.clienteId,
        data_pedido: pedido.data_pedido,
        metodo_pagamento: pedido.metodo_pagamento,
        preco_total: pedido.preco_total,
        status: pedido.status,
        produtos: Array.isArray(pedido.pedidos_produtos) ? pedido.pedidos_produtos.map(vendaProduto => ({
            id_produto: vendaProduto.produtoId,
            produto: vendaProduto.produtos.nome_produto,
            preco: vendaProduto.produtos.preco_unitario,
            quantidade: vendaProduto.qtd_produto,
        })) : []
    }));
};
