import {Request, Response} from 'express';
import {Connection, FindOptions, Repository} from 'typeorm';
import {Frame} from '../entities/Frame';
import {Game} from '../entities/Game';
import {Router} from './Router';

export class GamesRouter extends Router {

    root: string = '/games';

    initRoutes(connection: Connection) {
        let gameRepository = connection.getRepository(Game);

        this.router.get('/', async (req: Request, res: Response) => {
            let games = await gameRepository.createQueryBuilder('games')
                                            .innerJoinAndSelect('games.frames', 'frame')
                                            .getMany();
            res.send(games);
        });

        this.router.get('/:gameId', async (req: Request, res: Response) => {
            let id = req.params.gameId || null;
            if (id) {
                let findOptions:FindOptions = {
                    alias: 'game',
                    innerJoinAndSelect:{
                        frames: 'game.frames'
                    }
                };
                let game = await gameRepository.findOneById(id, findOptions);
                if(game) {
                    res.status(200);
                    res.send(game);
                    return;
                }
            }
            res.sendStatus(404);
        });

        this.router.post('/', async (req: Request, res: Response) => {
            let gameFromJSON = JSON.parse(req.body.game);
            let game = new Game(gameFromJSON);
            let gameRepository = connection.getRepository(Game);
            await gameRepository.persist(game);

            res.location(req.baseUrl + '/' + game.id);
            res.status(201);
            res.send(game);
        });

        this.router.put('/:gameId', async (req: Request, res: Response) => {
            console.log(req.body.game);
            let game: Game = new Game(JSON.parse(req.body.game));
            if (GamesRouter.gameAlreadyExists(game, gameRepository)) {
                await gameRepository.persist(game);
                res.status(204);
            } else {
                res.status(405);
            }
            res.send();
        });

        this.router.delete('/:gameId', async (req: Request, res: Response) => {
            let id = req.params.gameId || null;
            if (id) {
                let game: Game = await gameRepository.findOneById(id);
                await gameRepository.remove(game);
            }
            res.sendStatus(200);
        });

    }

    private static async gameAlreadyExists(game: Game, gameRepository: Repository<Game>) {
        return await gameRepository.findOneById(game.id);
    }
}

export default GamesRouter;


