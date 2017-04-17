import * as bodyParser from 'body-parser';
import {Middleware} from './Middleware';

export class BodyParser extends Middleware {

    handler(req, res, next): void {
        bodyParser.urlencoded({extended: true})(req, res, next);
    }

}
export default BodyParser;