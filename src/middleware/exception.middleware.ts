import { NextFunction, Request, Response } from "express";
import { IExceptionMiddleware } from "../common/interfaces/exception.middleware.interface.js";

export class ExceptionMiddleware implements IExceptionMiddleware {
    middleware(error: Error, req: Request, res: Response, next: NextFunction): void {
        res
        .status(400)
        .send({ error: error.message });
    }
}