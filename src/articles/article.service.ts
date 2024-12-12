import { Article } from "../common/dto/article.dto.js";
import prisma from "../database/database.module.js";

export class ArticleService {
    constructor(public articleRepository = prisma.articles) {}
    
    async findAll(tagFilters: string[] = [], auth: boolean) {
        const tag = {
            some: {
                name: {
                    in: tagFilters,
                },
            },
        }

        const articles = await this.articleRepository.findMany({
            where: {
                ...(auth ? {} : { published: true }),
                ...(tagFilters.length === 0 ? {} : { tags: tag }),

            },
            include: {
                tags: true,
            },
        });

        return articles;
    }

    findOne(id: number, auth: boolean) {
        return this.articleRepository.findFirst({ 
            where: { id, ...(auth ? {} : { published: true }) }, 
            include: { tags: true } 
        });
    }

    createArticle(article: Article) {
        return this.articleRepository.create({ data: {
            ...article,
            tags: {
                connectOrCreate: article.tags.map((tag) => ({ 
                    where: { name: tag }, 
                    create: { name: tag } 
                })),
            },
        }})
        .then((article: any) => article)
        .catch(() => {
            return { error: "Article not created" }
        });
    }

    updateArticle(id: number, article: Article) {        
        return this.articleRepository.update({
            where: { id },
            data: {
                ...article,
                tags: {
                    connectOrCreate: article.tags.map((tag) => ({ 
                        where: { name: tag }, 
                        create: { name: tag } 
                    })),
                }
            },
            include: {
                tags: true,
            }
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