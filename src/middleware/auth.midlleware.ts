import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../common/interfaces/middleware.interface.js";
import jwt from 'jsonwebtoken';

 export class Auth implements IMiddleware {
    public middleware(req: Request, res: Response, next: NextFunction): void {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            
            if (!token) {
                throw new Error();
            }
            
            const decoded = jwt.verify(token, "ENV_SECRET");
            
            next();
        } catch (err) {
            res.status(401).send('Please authenticate');
        }
    }
}