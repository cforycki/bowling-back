import * as games from '../json/games.json';
import {Router} from './Router';

export class GamesRouter extends Router {
    root: string = '/games';

    constructor() {
        super();
        this.router.get('/', (req: any, res: any) => res.send(games));
    }
}

export default GamesRouter;


