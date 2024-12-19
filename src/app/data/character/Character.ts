
import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { Realm } from "../realms/Realm";
import { RealmController } from "../realms/RealmController";
import { RealmEnum } from "../realms/RealmEnum";
import { Utilities } from "../utils/Utilities";
import { CharacterAttributes } from "./CharacterAttributes";
import { FightingExperience } from "./FightingExperience";

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

    // encapsulates fighting experience
    fightingExperience: FightingExperience;

    //list of items the character has
    itemList: Set<ItemIdEnum | ExploreZoneIdEnum>;

    private baseBodyGain = 0.1;
    private baseQiGain = 0.1;
    
    private bodyToQiCapacityRatio = 0.1; //10% of body as qi capacity

    private bodyToPowerRatio = 0.35; //35%
    private qiToPowerRatio = 0.65 //65%

    private bodyToHealthRatio = 0.65; //65%
    private qiToHealthRatio = 0.35 //35%

    constructor() {
        this.year = 16
        this.day = 1;
        this.realm = RealmController.getRealmById(RealmEnum.MORTAL);
        this.maxAge = 30;
        this.money = 0;
        this.attributes = new CharacterAttributes();
        this.itemList = new Set<ItemIdEnum | ExploreZoneIdEnum>();
        this.fightingExperience = new FightingExperience;
        this.resetDefaultValues();
    }

    resetDefaultValues() {
        this.year = 16
        this.day = 1;
        this.realm = RealmController.getRealmById(RealmEnum.MORTAL);
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
            * this.bodyToQiCapacityRatio);
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
        return Utilities.roundTo2Decimal(this.attributes.qi);
    }

    getBody() {
        return Utilities.roundTo2Decimal(this.attributes.body);
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
     * Qi affects power more than Body
     */
    getFightingPower() {
        const POWER_RAISE_PER_LEVEL = 0.15
        const appliedBodyPower = (this.getBody() * this.bodyToPowerRatio);
        const appliedQiPower = (this.getQi() * this.qiToPowerRatio);
        const appliedFightingLevel = 1 + ((this.fightingExperience.getLevel()-1) * POWER_RAISE_PER_LEVEL)
        const finalPower = (appliedBodyPower + appliedQiPower) * appliedFightingLevel;
        return Utilities.roundTo2Decimal(finalPower);
    }

    /**
     * Current total power
     * Qi affects power more than Body
     */
    getHealth() {
        const appliedBodyHealth = (this.getBody() * this.bodyToHealthRatio);
        const appliedQiHealth = (this.getQi() * this.qiToHealthRatio);
        const appliedFightingLevel = 1 + ((this.fightingExperience.getLevel()-1) * 0.1)
        const finalPower = (appliedBodyHealth + appliedQiHealth) * appliedFightingLevel;
        return Utilities.roundTo2Decimal(finalPower);
    }

}