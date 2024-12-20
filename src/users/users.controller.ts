import { Router, Request, NextFunction } from "express";

import { IRoute } from "../common/interfaces/route.interface.js";
import { IController } from "../common/interfaces/controller.interface.js";

import { UserService } from "./users.service.js";

import { param, validationResult  } from "express-validator";
import { userValidationChain } from "../common/validators/user.create.validation.js";

import { Auth } from "../middleware/auth.midlleware.js";

export class UserController implements IController {
    init(): IRoute {
        const router = Router()
        const userService = new UserService();
        
        router.use(new Auth().middleware);

        // Создание нового пользователя
        router.post('/', userValidationChain, async (req: Request, res: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const user = await userService.createUser(req.body);
            res.send(user);
        })

        // Автоизация пользователя
        router.post('/login', userValidationChain, async (req: Request, res: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const user = await userService.loginUser(req.body);
            res.send(user);
        })
        
         router.use((req: Request, res: any, next: NextFunction) => {
            if (!res.locals.isAuthenticated) {
                return res.status(401).json({ error: 'Authentication required' });
            }
            next();
        });

        // Удаление конкретного пользователя
        router.delete('/:id', param('id').isInt(), async (req: Request, res: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            console.log(req.params.id);

            const user = await userService.deleteUser(Number(req.params.id));
            res.send(user);
        })

        return { path: '/users', router }
    }
}