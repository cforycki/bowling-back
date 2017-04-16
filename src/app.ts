import * as _ from 'underscore';
import AllowCrossDomain from './middleware/AllowCrossDomain';
import Middleware from './middleware/Middleware';
import GamesRouter from './routes/GamesRouter';
import Router from './routes/Router';
import express = require('express');

export class App {
    private root: string = '/api';
    private app: any;
    private middlewares: Array<Middleware> = [
        new AllowCrossDomain()
    ];
    private routes: Array<Router> = [
        new GamesRouter()
    ];

    constructor() {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes();

        this.app.listen(3000, function () {
            console.log('Listening on port 3000...');
        });
    }

    initMiddlewares() {
        if (this.app) {
            _.each(this.middlewares, (middleware: Middleware) => this.app.use(middleware.handler));
        }
    }

    initRoutes() {
        if (this.app) {
            _.each(this.routes, (router: Router) => this.app.use(this.root + router.root, router.router));
        }
    }
}
new App();