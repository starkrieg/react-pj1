import { CharacterAttributes } from "./CharacterAttributes";
import { MortalRealm } from "./realms/MortalRealm";
import { Realm } from "./realms/Realm";

export class Character {

    year: number;
    day: number;
    maxAge: number;
    
    // realm is the cultivation realm
    realm: Realm;
    
    // money represents currency
    money: number;
    
    //character attributes in a separate object
    //its also so realm ups can be done easier
    attributes: CharacterAttributes;

    isShowFoundation = false;
    
    unlockShowFoundation() {
        this.isShowFoundation = true;
    }

    constructor() {
        this.year = 16
        this.day = 1;
        this.realm = new MortalRealm();
        this.maxAge = 30;
        this.money = 0;
        this.attributes = new CharacterAttributes();
        this.resetDefaultValues();
    }

    resetDefaultValues() {
        this.year = 16
        this.day = 1;
        this.realm = new MortalRealm();
        this.maxAge = 30;
        this.money = 0;
        this.attributes.qi = 0;
        this.attributes.qiCapacity = 100;
        this.attributes.body = 1;
        this.attributes.bodyCapacity = 100;
        this.attributes.soul = 0;
        this.attributes.talent = 1;
    }

    private updateStats() {
        const bodyToCapacityDifferential = 0.1;
        const qiBaseMinCapacity = this.attributes.qiBaseMinCapacity;
        const bodyToCapacity = ((this.attributes.body-1) * this.attributes.talent * bodyToCapacityDifferential);
        this.attributes.qiCapacity = qiBaseMinCapacity + bodyToCapacity;
    }

    getQiCapPercent(){
        return this.attributes.qi / this.attributes.qiCapacity;
    }

    getBodyCapPercent() {
        return this.attributes.body / this.attributes.bodyCapacity;
    }

    //base gain applied talent
    getBaseBodyGain() {
        const baseBodyGain = 0.1;
        return baseBodyGain * this.attributes.talent;
    }

    //base gain applied talent
    getBaseQiGain() {
        const baseQiGain = 0.1;
        return baseQiGain * this.attributes.talent;
    }

    getMoney() {
        return this.money;
    }

    getQi() {
        return this.attributes.qi;
    }

    getBody() {
        return this.attributes.body;
    }

    setBaseMinCapacity(value: number) {
        this.attributes.qiBaseMinCapacity = value;
        this.updateStats();        
    }

    //pure increase on stat
    increaseQi(value: number) {
        if (this.attributes.qi < this.attributes.qiCapacity) {
            this.attributes.qi += value;
            if (this.attributes.qi > this.attributes.qiCapacity) {
                this.attributes.qi = this.attributes.qiCapacity;
            }
        }
    }

    //pure increase on stat
    increaseBody(value: number) {
        if (this.attributes.body < this.attributes.bodyCapacity) {
            this.attributes.body += value;
            if (this.attributes.body > this.attributes.bodyCapacity) {
                this.attributes.body = this.attributes.bodyCapacity;
            }
        }
        this.updateStats();

    }

    increaseMoney(value: number) {
        this.money += value;
    }
}