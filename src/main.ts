import { ArticleController } from './articles/article.controller.js';
import { WebServer } from './server.js';

async function boot() {
    WebServer.addRoutes(new ArticleController().init());
    WebServer.start();
}

boot();