import express = require('express');
import {Connection} from 'typeorm';

export abstract class Router {
    router = express.Router();
    abstract root: string;

    abstract initRoutes(connection: Connection)
}
export default Router;