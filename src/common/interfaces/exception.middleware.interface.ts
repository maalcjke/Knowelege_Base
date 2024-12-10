import { NextFunction, Request, Response } from "express";

export interface IExceptionMiddleware {
    middleware(error: Error, req: Request, res: Response, next: NextFunction): void;
}   