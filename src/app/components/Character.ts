import { CharacterAttributes } from "./CharacterAttributes";
import { Realm } from "./realms/Realm";
import { RealmController } from "./realms/RealmController";

export class Character {

    year: number;
    day: number;
    maxAge: number;
    
    // realm is the cultivation realm
    realm: Realm | undefined;
    
    // money represents currency
    money: number;
    
    //character attributes in a separate object
    //its also so realm ups can be done easier
    attributes: CharacterAttributes;

    // counter for amount of deaths
    deaths: number;

    unlockables = new Map<string, boolean>();

    baseBodyGain = 0.1;
    baseQiGain = 0.1;
    
    unlockShowFoundation() {
        this.unlockables.set('show-foundation', true);
    }

    getUnlockStatus(unlockId: string) {
        return this.unlockables.get(unlockId) || false;
    }

    constructor() {
        this.year = 16
        this.day = 1;
        this.realm = RealmController.getRealmById('mortal');
        this.maxAge = 30;
        this.money = 0;
        this.deaths = 0;
        this.attributes = new CharacterAttributes();
        this.resetDefaultValues();
    }

    private resetDefaultValues() {
        this.year = 16
        this.day = 1;
        this.realm = RealmController.getRealmById('mortal');
        this.maxAge = 30;
        this.money = 0;
        this.attributes.qi = 0;
        this.attributes.qiBaseCapacity = 100;
        this.attributes.body = 1;
        this.attributes.bodyCapacity = 100;
        this.attributes.soul = 0;
        this.attributes.talent = 0.1;
        this.updateStats();
    }

    firstStartCharacter() {
        //reset to starting values
        this.resetDefaultValues();
    }

    reviveCharacter() {
        //count new death
        this.deaths++;
        //reset to starting values
        this.resetDefaultValues();
        //apply permanent upgrades
    }

    private updateStats() {
        const bodyToCapacityDifferential = 0.1;
        const qiBaseCapacity = this.attributes.qiBaseCapacity;
        const bodyToCapacity = ((this.attributes.body-1) * this.attributes.talent * bodyToCapacityDifferential);
        this.attributes.qiTotalCapacity = qiBaseCapacity + bodyToCapacity;
    }

    getQiCapPercent(){
        return this.attributes.qi / this.attributes.qiTotalCapacity;
    }

    getBodyCapPercent() {
        return this.attributes.body / this.attributes.bodyCapacity;
    }

    //base gain applied talent
    getBaseBodyGain() {
        return this.baseBodyGain * this.attributes.talent;
    }

    //base gain applied talent
    getBaseQiGain() {
        return this.baseQiGain * this.attributes.talent;
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
        this.attributes.qiBaseCapacity = value;
        this.updateStats();        
    }

    //pure increase on stat
    increaseQi(value: number) {
        if (this.attributes.qi < this.attributes.qiTotalCapacity) {
            this.attributes.qi += value;
            if (this.attributes.qi > this.attributes.qiTotalCapacity) {
                this.attributes.qi = this.attributes.qiTotalCapacity;
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