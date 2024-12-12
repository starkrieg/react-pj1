
export default class FightAttributes {

    health: number;

    power: number;

    constructor(health: number, power: number) {
        //minimum health is 1 HP
        this.health = Math.max(health, 1);
        this.power = power;
    }
    
}
