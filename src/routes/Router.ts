import express = require('express');
import {Connection} from 'typeorm';
import {Router as ExpressRouter} from 'express';

export abstract class Router {
    router: ExpressRouter = express.Router();
    abstract root: string;

    abstract initRoutes(connection: Connection)
}
export default Router;