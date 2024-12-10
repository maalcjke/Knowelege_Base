import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../common/interfaces/middleware.interface.js";

 export class Auth implements IMiddleware {
    public middleware(req: Request, res: Response, next: NextFunction): void {
        console.log('Auth')
        next();
    }
}