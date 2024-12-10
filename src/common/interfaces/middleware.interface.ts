import { NextFunction, Request, Response } from "express";

export interface IMiddleware {
    middleware(req: Request, res: Response, next: NextFunction): Promise<any>;
}   