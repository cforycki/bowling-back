/**
 * Created by christophe on 16/04/17.
 */

export abstract class Middleware {
    abstract handler(req, res, next): void;
}
export default Middleware;