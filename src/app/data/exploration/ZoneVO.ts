import { ZoneIdEnum } from "./ZoneIdEnum";
import { ZoneLootVO } from "./ZoneLootVO";

export class ZoneVO {

    id: ZoneIdEnum;
    title: string;
    desc: string;

    power: number;

    //zone is marked complete after finished first time
    //used to control first clear reward
    isComplete: boolean;

    loot: ZoneLootVO[];

    clearReward: ZoneLootVO[];

    constructor(id: ZoneIdEnum, title: string, desc: string,
        power: number, isComplete: boolean, loot: ZoneLootVO[], 
        clearReward: ZoneLootVO[]) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.power = power;
        this.isComplete = isComplete;
        this.loot = loot; 
        this.clearReward = clearReward
    }
    
}