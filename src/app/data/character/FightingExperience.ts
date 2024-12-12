export class FightingExperience {

    // fight level or rank, multiplies the fighting power
    private level: number;
    // current amount of experience
    private experience: number;
    // required experience to level up fighting level
    private experienceNextLevel: number;

    private readonly EXP_UP_RATE = 1.5;

    constructor() {
        this.level = 1;
        this.experience = 0;
        this.experienceNextLevel = 100;
    }

    addFightingExperience(value: number) {
        this.experience += value;
        if (this.experience >= this.experienceNextLevel) {
            this.level += 1;
            this.experience -= this.experienceNextLevel;
            this.experienceNextLevel = this.experienceNextLevel * this.EXP_UP_RATE;
        }
    }

    getLevel() : Readonly<number> {
        return this.level;
    }

    getLevelStatus() {
        return [this.experience, this.experienceNextLevel];
    }
}