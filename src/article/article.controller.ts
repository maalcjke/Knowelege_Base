import { Router } from "express";

import { IRoute } from "../common/interfaces/route.interface.js";
import { IController } from "../common/interfaces/controller.interface.js";
import { ArticleService } from "./article.service.js";

export class ArticleController implements IController {
    init(): IRoute {
        const router = Router()

        router.get('/', new ArticleService().findAll) // Получение всех статей
        //Нужна фильтрация
        router.get('/:id', new ArticleService().findOne) // Получение конкретной статьи
        
        router.post('/', new ArticleService().createArticle) // Создание новой статьи
        router.put('/:id', new ArticleService().updateArticle) // Обновление конкретной статьи
        router.delete('/:id', new ArticleService().deleteArticle) // Удаление конкретной статьи

        return { path: '/article', router }
    }
}