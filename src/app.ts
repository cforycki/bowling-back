import 'reflect-metadata';
import {Connection, createConnection} from 'typeorm';
import * as _ from 'underscore';
import AllowCrossDomain from './middlewares/AllowCrossDomain';
import BodyParser from './middlewares/BodyParser';
import Middleware from './middlewares/Middleware';
import GamesRouter from './routes/GamesRouter';
import Router from './routes/Router';
import express = require('express');

export class App {
    private root: string = '/api';
    private connection: Connection;
    private app: any;
    private middlewares: Array<Middleware> = [
        new BodyParser(),
        new AllowCrossDomain()
    ];
    private routes: Array<Router> = [
        new GamesRouter()
    ];

    constructor() {
        (async () => {
            this.app = express();

            this.initMiddlewares();
            await this.createConnection();
            this.initRoutes();

            this.app.listen(3000, function () {
                console.log('Listening on port 3000...');
            });
        })();
    }

    initMiddlewares() {
        if (this.app) {
            _.each(this.middlewares, (middleware) => this.app.use(middleware.handler));
        }
    }

    initRoutes() {
        if (this.app) {
            _.each(this.routes, (router: Router) => {
                router.initRoutes(this.connection);
                this.app.use(this.root + router.root, router.router);
            });
        }
    }

    async createConnection() {
        await createConnection({
                                   driver:         {
                                       type:     'postgres',
                                       host:     'localhost',
                                       port:     4000,
                                       username: 'postgres',
                                       password: 'dev',
                                       database: 'bowling'
                                   },
                                   entities:       [
                                       __dirname + '/entities/*.js'
                                   ],
                                   autoSchemaSync: true
                               })
            .then(async connection => {
                this.connection = await connection;
            });
    }
}
new App();