import { Utilities } from "../utils/Utilities";

export default class FightAttributes {

    name: string;
    health: number;
    power: number;

    constructor(health: number, power: number, name: string) {
        this.name = name;
        //minimum health is 1 HP
        this.health = Utilities.roundTo2Decimal(health);
        this.power = Utilities.roundTo2Decimal(power);
    }
    
}
