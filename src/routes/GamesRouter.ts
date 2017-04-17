import {Connection} from 'typeorm';
import {Game} from '../entities/Game';
import {Router} from './Router';
import {Frame} from '../entities/Frame';
import * as _ from 'underscore';

export class GamesRouter extends Router {

    root: string = '/games';

    initRoutes(connection: Connection) {
        this.router.get('/', async (req: any, res: any) => {
            let gameRepository = connection.getRepository(Game);
            let games = await gameRepository.createQueryBuilder('games')
                                            .innerJoinAndSelect('games.frames', 'frame')
                                            .getMany();
            res.send(games);
        });

        this.router.post('/', async (req: any, res: any) => {
            let frames: Array<Frame> = JSON.parse(req.body.frames);
            let game = new Game({frames});
            let gameRepository = connection.getRepository(Game);
            await gameRepository.persist(game);
            res.send(game);
        });
    }
}

export default GamesRouter;


