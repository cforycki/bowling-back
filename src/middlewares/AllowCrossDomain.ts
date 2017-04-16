import {Middleware} from './Middleware';

export class AllowCrossDomain extends Middleware {
    constructor(){
        super();
    }

    handler(req, res, next): void {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    }

}
export default AllowCrossDomain;