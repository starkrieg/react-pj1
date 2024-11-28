
import { ItemIdEnum } from "../items/ItemIdEnum";
import { Realm } from "../realms/Realm";
import { RealmController } from "../realms/RealmController";
import { CharacterAttributes } from "./CharacterAttributes";

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

    //list of items the character has
    itemList: Set<ItemIdEnum>;

    private baseBodyGain = 0.1;
    private baseQiGain = 0.1;
    
    private bodyCapacityRatio = 0.1; //10% of body as qi capacity

    private powerBodyDif = 0.1; //10%
    private powerQiDif = 0.5 //50%

    constructor() {
        this.year = 16
        this.day = 1;
        this.realm = RealmController.getRealmById('mortal');
        this.maxAge = 30;
        this.money = 0;
        this.attributes = new CharacterAttributes();
        this.deaths = 0;
        this.itemList = new Set<ItemIdEnum>();
        this.resetDefaultValues();
    }

    resetDefaultValues() {
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

    private updateStats() {
        
        const qiBaseCapacity = this.attributes.qiBaseCapacity;
        const bodyToCapacity = ((this.attributes.body-1) 
            * this.attributes.talent 
            * this.bodyCapacityRatio);
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

    /**
     * Current total power
     * 
     */
    getPower() {
        return (this.getBody() * this.powerBodyDif) + (this.getQi() * this.powerQiDif);
    }
}