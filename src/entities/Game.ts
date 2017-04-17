import {Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Frame} from './Frame';
import * as _ from 'underscore';

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Frame, frame => frame.game, {
        cascadeInsert: true,
        cascadeUpdate: true,
        lazy:          false
    })
    frames: Array<Frame>;

    constructor();
    constructor({frames}: { frames: Array<Frame>});
    constructor(param? : { frames: Array<Frame>} | undefined) {
        this.frames = param && param.frames || [];
    }
}