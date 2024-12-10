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
        .then((article) => article)
        .catch(() => {
            return {error: 'Unable to create article'}
        });
    }

    updateArticle(article: Partial<Article> & { id: string }) {
        const updateData: any = {};
    
        if (article.title) {
            updateData.title = article.title;
        }
    
        if (article.content) {
            updateData.content = article.content;
        }
    
        if (article.tags && article.tags.length > 0) {
            updateData.tags = {
                connectOrCreate: article.tags.map((tag: string) => ({
                    where: { name: tag },
                    create: { name: tag }
                }))
            };
        }
    
        return this.articleRepository.update({
            where: { id: article.id },
            data: updateData,
        })
        .catch(() => {
            return {error: 'Article not found'}
        });;
    }

    deleteArticle(id: number) {
        return this.articleRepository.delete({ where: { id } })
        .catch(() => {
            return {error: 'Article not found'}
        });
    }
}