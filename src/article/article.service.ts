export class ArticleService {
    findAll(req: any, res: any) {
        console.log(req.params.id);
        res.send('All articles');
    }

    findOne(req: any, res: any) {
        console.log(req.params.id);
        res.send('One article');
    }

    filterArticles(req: any, res: any) {
        console.log(req.query);
        res.send('Filter articles');
    }

    createArticle(req: any, res: any) {
        console.log(req.body);
        res.send('Create article');
    }

    updateArticle(req: any, res: any) {
        console.log(req.body);
        res.send('Update article');
    }

    deleteArticle(req: any, res: any) {
        console.log(req.body);
        res.send('Delete article');
    }
}