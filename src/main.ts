import { ArticleController } from './articles/article.controller.js';
import { WebServer } from './server.js';
import { UserController } from './users/users.controller.js';

async function boot() {
    if(await WebServer.checkDataBase() === false) return;

    WebServer.addRoutes(new ArticleController().init());
    WebServer.addRoutes(new UserController().init());
    WebServer.start();
}

boot();