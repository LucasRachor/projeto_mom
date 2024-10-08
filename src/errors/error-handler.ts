import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
        // Se o erro contém um status definido, retorne o status e a mensagem
        res.status(err.status).json({ message: err.message });
    } else
    // Se o erro não for conhecido, retorne 500 (Erro Interno)
    res.status(500).json({ message: "Erro interno do servidor", error: err.message });
};
