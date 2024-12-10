import express from 'express';
import { ArticleController } from './article/article.controller.js';
import { WebServer } from './server.js';

async function boot() {
    WebServer.addRoutes(new ArticleController().init());
    WebServer.start();
}

boot();