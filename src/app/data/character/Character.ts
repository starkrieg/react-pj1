
import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { Realm } from "../realms/Realm";
import { RealmController } from "../realms/RealmController";
import { RealmEnum } from "../realms/RealmEnum";
import { Utilities } from "../utils/Utilities";
import { AttributeTypeEnum } from "./AttributeTypeEnum";
import { CharacterAttributes } from "./CharacterAttributes";
import { FightingExperience } from "./FightingExperience";

export class Character {

    year: number;
    day: number;
    maxAge: number;
    
    // realm is the cultivation realm
    realm: Realm | undefined;
        
    //character attributes in a separate object
    //its also so realm ups can be done easier
    attributes: CharacterAttributes;

    // encapsulates fighting experience
    fightingExperience: FightingExperience;

    //list of items the character has
    itemList: Set<ItemIdEnum | ExploreZoneIdEnum>;

    private baseBodyGain = 0.1;
    private baseQiGain = 0.1;
    
    private readonly BODY_TO_QI_CAPACITY_RATIO = 0.1; //10% of body as qi capacity

    private bodyToPowerRatio = 0.35; //35%
    private qiToPowerRatio = 0.65 //65%

    private bodyToHealthRatio = 0.65; //65%
    private qiToHealthRatio = 0.35 //35%

    constructor() {
        this.year = 16
        this.day = 1;
        this.realm = RealmController.getRealmById(RealmEnum.MORTAL);
        this.maxAge = 30;
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
        this.attributes.setAttributeValue(AttributeTypeEnum.QI, 0);
        this.attributes.setAttributeValue(AttributeTypeEnum.QI_BASE_CAPACITY, 100);
        this.attributes.setAttributeValue(AttributeTypeEnum.BODY, 1);
        this.attributes.setAttributeValue(AttributeTypeEnum.BODY_CAPACITY, 100);
        this.attributes.setAttributeValue(AttributeTypeEnum.SOUL, 0);
        this.attributes.setAttributeValue(AttributeTypeEnum.TALENT, 0.1);
        this.updateStats();
    }

    private getAttributeValueOr0(attribute: AttributeTypeEnum) {
        return this.attributes.getAttributeValue(attribute) || 0;
    }

    private updateStats() {        
        const qiBaseCapacity = this.getAttributeValueOr0(AttributeTypeEnum.QI_BASE_CAPACITY);
        const bodyToQiCapacity = ((this.getAttributeValueOr0(AttributeTypeEnum.BODY) - 1)
            * this.getAttributeValueOr0(AttributeTypeEnum.TALENT)
            * this.BODY_TO_QI_CAPACITY_RATIO);
        this.attributes.setAttributeValue(AttributeTypeEnum.QI_TOTAL_CAPACITY, (qiBaseCapacity + bodyToQiCapacity))
    }

    getQiCapPercent(){
        return this.getAttributeValueOr0(AttributeTypeEnum.QI) / this.getAttributeValueOr0(AttributeTypeEnum.QI_TOTAL_CAPACITY);
    }

    getBodyCapPercent() {
        return this.getAttributeValueOr0(AttributeTypeEnum.BODY) / this.getAttributeValueOr0(AttributeTypeEnum.BODY_CAPACITY);
    }

    getBodyGainWithTalent() {
        return this.baseBodyGain * this.getAttributeValueOr0(AttributeTypeEnum.TALENT);
    }

    //base gain applied talent
    getQiGainWithTalent() {
        return this.baseQiGain * this.getAttributeValueOr0(AttributeTypeEnum.TALENT);
    }

    getCoins() {
        return this.getAttributeValueOr0(AttributeTypeEnum.COIN);
    }

    getQi() {
        return Utilities.roundTo2Decimal(this.getAttributeValueOr0(AttributeTypeEnum.QI));
    }

    getBody() {
        return Utilities.roundTo2Decimal(this.getAttributeValueOr0(AttributeTypeEnum.BODY));
    }

    setBaseMinCapacity(value: number) {
        this.attributes.setAttributeValue(AttributeTypeEnum.QI_BASE_CAPACITY, value);
        this.updateStats();        
    }

    increaseAttribute(attribute: AttributeTypeEnum, value: number) {
        switch(attribute) {
            case AttributeTypeEnum.QI:
                this.increaseQi(value);
                break;
            case AttributeTypeEnum.BODY:
                this.increaseBody(value);
                break;
            case AttributeTypeEnum.INTERNAL_INJURY:
                const currentInternalDamage = this.getAttributeValueOr0(AttributeTypeEnum.INTERNAL_INJURY);
                if (value < 0) {
                    if (currentInternalDamage + value <= 0) {
                        value = -currentInternalDamage;
                    }
                    this.attributes.addAttributeValue(attribute, value);
                } else {
                    
                    if (currentInternalDamage < 100) {
                        if ((currentInternalDamage + value) >= 100) {
                            value = 100 - currentInternalDamage;
                        }
                        this.attributes.addAttributeValue(attribute, value);
                    }
                }
                break;
            default:
                this.attributes.addAttributeValue(attribute, value);
                break;
        }

    }

    //pure increase on stat
    private increaseQi(value: number) {
        const qiTotalCapacity = this.getAttributeValueOr0(AttributeTypeEnum.QI_TOTAL_CAPACITY);
        if (this.getAttributeValueOr0(AttributeTypeEnum.QI) < qiTotalCapacity) {
            this.attributes.addAttributeValue(AttributeTypeEnum.QI, value);
            if (this.getAttributeValueOr0(AttributeTypeEnum.QI) > qiTotalCapacity) {
                this.attributes.addAttributeValue(AttributeTypeEnum.QI, qiTotalCapacity);
            }
        }
    }

    //pure increase on stat
    private increaseBody(value: number) {
        const bodyCapacity = this.getAttributeValueOr0(AttributeTypeEnum.BODY_CAPACITY);
        if (this.getAttributeValueOr0(AttributeTypeEnum.BODY) < bodyCapacity) {
            this.attributes.addAttributeValue(AttributeTypeEnum.BODY, value);
            if (this.getAttributeValueOr0(AttributeTypeEnum.BODY) > bodyCapacity) {
                this.attributes.addAttributeValue(AttributeTypeEnum.BODY, bodyCapacity);
            }
        }
        this.updateStats();
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
        const appliedInternalInjury = 1 - (this.getAttributeValueOr0(AttributeTypeEnum.INTERNAL_INJURY) / 100)
        const finalPower = (appliedBodyPower + appliedQiPower) * appliedFightingLevel * appliedInternalInjury;
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
        const appliedInternalInjury = 1 - (this.getAttributeValueOr0(AttributeTypeEnum.INTERNAL_INJURY) / 100)
        const finalPower = (appliedBodyHealth + appliedQiHealth) * appliedFightingLevel * appliedInternalInjury;
        return Utilities.roundTo2Decimal(finalPower);
    }

    getAttributeValue(attribute: AttributeTypeEnum) {
        return this.getAttributeValueOr0(attribute);
    }

}