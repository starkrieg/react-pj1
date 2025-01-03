import { MessageController } from "../messages/MessageController";
import { Utilities } from "../utils/Utilities";

export class FightingExperience {

    // fight level or rank, multiplies the fighting power
    private level: number;
    // current amount of experience
    private experience: number;
    // required experience to level up fighting level
    private experienceNextLevel: number;

    private readonly EXP_UP_RATE = 2.15;

    constructor() {
        this.level = 0;
        this.experience = 0;
        this.experienceNextLevel = 25;
    }

    addFightingExperience(value: number) {
        this.experience += value;
        if (this.experience >= this.experienceNextLevel) {
            this.level += 1;
            this.experience -= this.experienceNextLevel;
            this.experienceNextLevel = Utilities.roundTo0Decimal(this.experienceNextLevel 
                * this.EXP_UP_RATE);
            const lvPowerMod = Utilities.roundTo0Decimal((this.level * 0.01)*100)
            MessageController.pushMessageGeneral(`Reached level ${this.level}!`)
            MessageController.pushMessageGeneral(`Base Power and Health are now raised by ${lvPowerMod}%!`)
        }
    }

    getLevel() : Readonly<number> {
        return this.level;
    }

    getLevelStatus() {
        return [this.experience, this.experienceNextLevel];
    }
}