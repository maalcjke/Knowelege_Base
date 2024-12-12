import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

import { IMiddleware } from "../common/interfaces/middleware.interface.js";
import { Config } from "../config/config.js";

export class Auth implements IMiddleware {
    public async middleware(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                res.locals.isAuthenticated = false;
                return next();
            }
            
            const decoded = jwt.verify(token, Config.get<string>('JWT_SECRET'));
            res.locals.isAuthenticated = !!decoded;
            
        } catch (err) {
            res.locals.isAuthenticated = false;
        }
        next();
    }
}