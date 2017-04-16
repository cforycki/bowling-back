/**
 * Created by christophe on 16/04/17.
 */
import express = require('express');
export abstract class Router {
    router = express.Router();
    abstract root: string;
}
export default Router;