import { ZoneIdEnum } from "./ZoneIdEnum";

export class ZoneVO {

    id: ZoneIdEnum;
    title: string;
    desc: string;

    power: number;

    //zone is marked complete after finished first time
    //used to control first clear reward
    isComplete: boolean;

    constructor(id: ZoneIdEnum, title: string, desc: string,
        power: number, isComplete: boolean) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.power = power;
        this.isComplete = isComplete;

    }
    
}