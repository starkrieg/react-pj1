export class Character {

    year: number;
    month: number;
    maxAge: number;
    
    // realm is the cultivation realm
    realm: string;
    
    // money represents currency
    money: number;
    
    // qi is an attribute related to spells and power, 
    // and a main guideline for cultivation
    qi: number;
    qiCapacity: number;
    
    qiBaseMinCapacity = 1000;

    // body represents how strong is the character's body
    // helps guide some cultivation aspects
    body: number;

    // soul repesents how strong is the characte's soul
    // helps guide some cultivation aspects
    soul: number;

    // talent is a guide to how fast the character can grow
    // talent multiples Qi Capacity and every attribute Base Gain
    // more talent means faster growth
    talent: number;
    
    constructor() {
        this.year = 16
        this.month = 1;
        this.realm = 'Mortal';
        this.maxAge = 30;
        this.money = 0;
        this.qi = 0;
        this.qiCapacity = 1000;
        this.body = 1;
        this.soul = 0;
        this.talent = 1;
        this.resetDefaultValues();
    }

    resetDefaultValues() {
        this.year = 16
        this.month = 1;
        this.realm = 'Mortal';
        this.maxAge = 30;
        this.money = 0;
        this.qi = 0;
        this.qiCapacity = 1000;
        this.body = 1;
        this.soul = 0;
        this.talent = 1;
    }

    private updateStats() {
        const bodyToCapacityDifferential = 0.1;
        this.qiCapacity = this.qiBaseMinCapacity + ((this.body-1) * this.talent * bodyToCapacityDifferential);
    }

    getQiCapPercent(){
        return this.qi / this.qiCapacity;
    }

    //base gain applied talent
    getBaseBodyGain() {
        const baseBodyGain = 0.1;
        return baseBodyGain * this.talent;
    }

    //pure increase on stat
    increaseBody(value: number) {
        this.body += value;
        this.updateStats();
    }

    //base gain applied talent
    getBaseQiGain() {
        const baseQiGain = 0.1;
        return baseQiGain * this.talent;
    }

    //úre increase on stat
    increaseQi(value: number) {
        this.qi += value;
        if (this.qi + value > this.qiCapacity) {
            this.qi = this.qiCapacity;
        }
    }

    increaseMoney(value: number) {
        this.money += value;
    }
}