import { Utilities } from "../utils/Utilities";

export class FightingExperience {

    // fight level or rank, multiplies the fighting power
    private level: number;
    // current amount of experience
    private experience: number;
    // required experience to level up fighting level
    private experienceNextLevel: number;

    private readonly EXP_UP_RATE = 1.75;

    constructor() {
        this.level = 1;
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
        }
    }

    getLevel() : Readonly<number> {
        return this.level;
    }

    getLevelStatus() {
        return [this.experience, this.experienceNextLevel];
    }
}