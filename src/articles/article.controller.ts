import { Router, Request, Response } from "express";

import { IRoute } from "../common/interfaces/route.interface.js";
import { IController } from "../common/interfaces/controller.interface.js";
import { ArticleService } from "./article.service.js";
import { Article } from "../common/dto/article.dto.js";
import { articleValidationChain } from "../common/validators/article.create.validation.js";
import { param, ValidationChain, validationResult  } from "express-validator";
import { articleUpdateValidationChain } from "../common/validators/article.update.validation.js";

export class ArticleController implements IController {
    init(): IRoute {
        const router = Router()
        const articleService = new ArticleService();

        // Все статьи
        router.get('/', async (req: Request, res: any) => {
            const tagsParam = req.query.tags as string | undefined;
            const tags = tagsParam ? tagsParam.split(',').map(tag => tag.trim()) : [];
            
            if(tags.length > 0) {
                const articles = await articleService.findAll(tags);
                return res.send(articles);
            }

            const articles = await articleService.findAll();
            res.send(articles);
        })
        
        // Конкретная статья
        router.get('/:id', param('id').isInt(), async (req: Request, res: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
            const article = await articleService.findOne(Number(req.params.id));
            res.send(article);
        })
        
        // Создание новой статьи
        router.post('/', articleValidationChain, async (req: Request, res: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const article = await articleService.createArticle(req.body);
            res.send(article);
        })
        
        // Обновление конкретной статьи
        router.put('/:id', articleUpdateValidationChain, async (req: Request, res: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const article = await articleService.updateArticle(req.body);
            res.send(article);
        })
        
        // Удаление конкретной статьи
        router.delete('/:id', param('id').isInt(), async (req: Request, res: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const article = await articleService.deleteArticle(Number(req.params.id));
            res.send(article);
        })

        return { path: '/articles', router }
    }
}