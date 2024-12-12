import { Prisma } from "@prisma/client";
import { Article } from "../common/dto/article.dto.js";
import prisma from "../database/database.module.js";

export class ArticleService {
    constructor(public articleRepository = prisma.articles) {}
    
    async findAll(tagFilters: string[] = [], auth: boolean) {
        let where: Prisma.ArticlesWhereInput = {};

        if(!auth) where.published = true;

        if (tagFilters.length > 0) {
            where.tags = {
                some: {
                    name: {
                        in: tagFilters,
                    },
                },
            };
        }

        const articles = await this.articleRepository.findMany({
            where,
            include: {
                tags: true,
            },
        });

        return articles;
    }

    findOne(id: number, auth: boolean) {
        return this.articleRepository.findFirst({ where: { id: id, published: !auth }, include: { tags: true } });
    }

    createArticle(article: Article) {
        return this.articleRepository.create({ data: {
            title: article.title,
            content: article.content,
            tags: {
                connectOrCreate: article.tags.map((tag: string) => ({ where: { name: tag }, create: { name: tag } }))
            }
        } })
        .then((article: any) => article)
        .catch(() => {
            return {error: 'Unable to create article'}
        });
    }

    updateArticle(id: number, article: Article) {
        const { tags, ...articleData } = article;
        return this.articleRepository.update({
            where: { id },
            data: {
                ...articleData,
                tags: {
                    set: tags.map(tag => ({ name: tag }))
                }
            },
        })
        .catch(() => {
            return {error: 'Article not found'}
        });
    }

    deleteArticle(id: number) {
        return this.articleRepository.delete({ where: { id } })
        .catch(() => {
            return {error: 'Article not found'}
        });
    }
}