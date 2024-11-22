import { Character } from "../character/Character";
import { ErrorController } from "../utils/ErrorController";
import { ActivitiesEnum } from "./ActivitiesEnum";

export class Activity {

    private MIN_TICK_RANK = 6;

    id: ActivitiesEnum;
    title: string;
    desc: string;
    
    rank: number;
    exp: number;
    totalExpToNextRank: number;
    
    charRef: Character;
    action: CallableFunction;

    constructor(id: ActivitiesEnum, title: string, desc: string,
        charRef: Character, rank: number = 1, exp: number = 0) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        
        this.rank = rank;
        this.exp = exp;
        this.totalExpToNextRank = this.MIN_TICK_RANK;

        this.charRef = charRef;
        this.action = () => {
            ErrorController.throwSomethingWrongError();
        }
    }

    getTickGain() {
       return -1;
    }

    // every rank up increase total exp for next rank by 50%
    // increment exp by default 1
    incrementExp(value: number = 1) {
        this.exp += value;
        
        while (this.exp >= this.totalExpToNextRank) {
            this.rank += 1;
            this.exp += - this.totalExpToNextRank;
            this.totalExpToNextRank = (1 + ((this.rank-1) * 0.5)) * this.MIN_TICK_RANK;
        }
    }

}