import express, { Router } from 'express';
import { IRoute } from './common/interfaces/route.interface.js';
import { ExceptionMiddleware } from './middleware/exception.middleware.js';
import { Validate } from './middleware/validator.middleware.js';

export class WebServer {
    private static app: any = null;
    private static routes: Router[] = [];
    
    constructor() {}

    static start(): void {
        if(this.app !== null) return console.log('Server already started');
        
        this.app = express();
        this.app.use(express.json());

        this.app.use(new ExceptionMiddleware().middleware)

        this.app.use('/api', this.routes);

        this.app.listen(3000, () => {
            console.log('Server started on 3000 port');
        });
        
    }

    static stop(): void {
        this.app.close();
        console.log('Server stopped');
    }
    static addRoutes(controller: IRoute | IRoute[]): void {
        if(Array.isArray(controller)) {
            return controller.forEach(c => this.addRoutes(c));
        }
        
        const router = express.Router();
        router.use(controller.path, controller.router);
        this.routes.push(router);
    }
}
