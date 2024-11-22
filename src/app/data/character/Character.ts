
import { ItemIdEnum } from "../items/ItemIdEnum";
import { Realm } from "../realms/Realm";
import { RealmController } from "../realms/RealmController";
import { ErrorController } from "../utils/ErrorController";
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

    baseBodyGain = 0.1;
    baseQiGain = 0.1;
    
    /**
     * Gives the item to the character.
     * Character only holds the item id, not the whole item definition
     * @param itemId item id
     */
    giveItem(itemId: ItemIdEnum | undefined) {
        if (itemId) {
            this.itemList.add(itemId);
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    /**
     * Checks if character has the item
     * @param itemId item id
     * @returns 
     */
    isHaveItem(itemId: ItemIdEnum) {
        return this.itemList.has(itemId);
    }

    /**
     * Remove item from character.
     * Will throw error if the character did not have the item.
     * @param itemId 
     */
    removeItem(itemId: ItemIdEnum) {
        //remove the item, and check if worked
        //if item did not exist, might be an issue
        if (!this.itemList.delete(itemId)) {
            ErrorController.throwSomethingWrongError();
        }
    }

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

    /**
     * Reset values on game start or game hard reset
     */
    firstStartCharacter() {
        this.itemList = new Set<ItemIdEnum>();
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

    /**
     * Character current total power
     * 
     */
    getCharacterPower() {
        // power is 10% of body + 50% of qi
        return (this.getBody() * 0.1) + (this.getQi() * 0.5);
    }
}