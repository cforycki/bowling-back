import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Game} from './Game';

@Entity()
export class Frame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @Column({type: 'jsonb'})
    throws: Array<number>;

    @Column()
    total: number;

    @ManyToOne(type => Game, game => game.frames, {
        cascadeInsert: true,
        cascadeUpdate: true,
        lazy:          false
    })
    game: Game;

    constructor();
    constructor({id, number, throws, total}: { id?: number, number: number, throws: Array<number>, total?: number });
    constructor(param?: { id?: number, number: number, throws: Array<number>, total?: number } | undefined) {
        this.id = param && param.id || null;
        this.number = param && param.number || null;
        this.throws = param && param.throws || [];
        this.total = param && param.total || null;
    }
}