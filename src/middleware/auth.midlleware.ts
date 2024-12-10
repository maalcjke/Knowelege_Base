import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../common/interfaces/middleware.interface.js";
import jwt from 'jsonwebtoken';
import { Config } from "../config/config.js";

 export class Auth implements IMiddleware {
    public async middleware(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            
            if (!token) {
                throw new Error();
            }
            
            const decoded = jwt.verify(token, Config.get<string>('JWT_SECRET'));
            if(!decoded) throw new Error();

            next();
        } catch (err) {
            return res.status(401).send(err);
        }
    }
}