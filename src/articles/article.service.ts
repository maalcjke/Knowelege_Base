import { Article } from "../common/dto/article.dto.js";
import prisma from "../database/database.module.js";

export class ArticleService {
    constructor(public articleRepository = prisma.articles) {}
    
    findAll(tagFilters: string[] = []) {
        const articles = this.articleRepository.findMany({
            where: tagFilters && tagFilters.length > 0
                ? {
                      tags: {
                          some: {
                              name: {
                                  in: tagFilters,
                              },
                          },
                      },
                  }
                : undefined,
            include: {
                tags: true,
            },
        });
        return articles;
    }

    findOne(id: number) {
        return this.articleRepository.findFirst({ where: { id }, include: { tags: true } });
    }

    filterArticles(req: any, res: any) {
        console.log(req.query);
        res.send('Filter articles');
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