import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkNomeProduto = async (nome_produto: string): Promise<boolean> => {
    const checkNome = await prisma.produtos.findUnique({
        where: { nome_produto },
    });
    return !!checkNome
}

export const criarProduto = async (data: Prisma.ProdutosCreateInput) => {
    const nomeExiste = await checkNomeProduto(data.nome_produto);

    if (nomeExiste) {
        throw { status: 409, message: "Produto já cadastrado no sistema!" }
    }

    const produto = await prisma.produtos.create({
        data: {
            descricao_produto: data.descricao_produto,
            nome_produto: data.nome_produto,
            fornecedor: data.fornecedor,
            preco_unitario: data.preco_unitario,
            qty_em_estoque: data.qty_em_estoque
        },
    });
    return produto;
}

export const getProdutos = async() => {
    const allprodutos = await prisma.produtos.findMany({})
    return allprodutos
}