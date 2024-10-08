import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else
        res.status(500).json({ message: "Erro interno do servidor", error: err.message });
};
