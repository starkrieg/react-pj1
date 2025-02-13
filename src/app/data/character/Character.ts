
import { ActivitiesController } from "../activities/ActivitiesController";
import { ActivityEnum } from "../activities/ActivityEnum";
import { ModifierTypeEnum } from "../common/ModifierTypeEnum";
import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { Item } from "../items/Item";
import { ItemController } from "../items/ItemController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { BodyRealmController } from "../realms/BodyRealmController";
import { EnergyRealmController } from "../realms/EnergyRealmController";
import { BaseBodyRealm } from "../realms/body/BaseBodyRealm";
import { BodyRealmEnum } from "../realms/body/BodyRealmEnum";
import { BaseEnergyRealm } from "../realms/energy/BaseEnergyRealm";
import { EnergyRealmEnum } from "../realms/energy/EnergyRealmEnum";
import { Utilities } from "../utils/Utilities";
import { AttributeTypeEnum } from "./AttributeTypeEnum";
import { CharacterAttributes } from "./CharacterAttributes";
import { FightingExperience } from "./FightingExperience";

export class Character {

    year: number;
    
    // realm for energy cultivation
    energyRealm: BaseEnergyRealm;

    // realm for body cultivation
    bodyRealm: BaseBodyRealm;
        
    //character attributes in a separate object
    //its also so realm ups can be done easier
    private attributes: CharacterAttributes;

    // encapsulates fighting experience
    private fightingExperience: FightingExperience;

    //list of permanent items
    permanentItemList: Set<ItemIdEnum>;

    //list of cleared zones
    zoneClearedList: Set<ZoneIdEnum> = new Set<ZoneIdEnum>();

    inventoryList: Item[] = [];

    //the closer to the end of the lifespan, the lower the gains of training
    private ageGainModifier = 1;
    //at 50% of max lifespan, decline starts
    private declineAgeMeter = 0.5;

    private readonly baseBodyGain = 0.1;
    private readonly baseQiGain = 0.1;
    
    private readonly BODY_TO_QI_CAPACITY_RATIO = 0.15; //15% of body as qi capacity

    private readonly bodyToPowerRatio = 0.25; //25%
    private readonly qiToPowerRatio = 0.45 //45%

    private readonly bodyToHealthRatio = 0.45; //45%
    private readonly qiToHealthRatio = 0.25 //25%

    private readonly martialArtsMod = 100;
    private readonly qiSpellsMod = 100;

    private readonly POWER_RAISE_PER_LEVEL = 0.01; //1%
    private readonly HEALTH_RAISE_PER_LEVEL = 0.01; //1%

    constructor() {
        this.year = 16
        this.energyRealm = EnergyRealmController.getRealmById(EnergyRealmEnum.MORTAL);
        this.bodyRealm = BodyRealmController.getRealmById(BodyRealmEnum.MORTAL);
        this.attributes = new CharacterAttributes();
        this.fightingExperience = new FightingExperience;
        this.permanentItemList = new Set<ItemIdEnum>();
        this.resetDefaultValues();
    }

    resetDefaultValues() {
        this.year = 16
        this.zoneClearedList = new Set<ZoneIdEnum>();
        this.inventoryList = [];
        this.ageGainModifier = 1;
        this.energyRealm = EnergyRealmController.getRealmById(EnergyRealmEnum.MORTAL);
        this.bodyRealm = BodyRealmController.getRealmById(BodyRealmEnum.MORTAL);
        this.attributes.setAttributeValue(AttributeTypeEnum.LIFESPAN, 60);
        this.attributes.setAttributeValue(AttributeTypeEnum.QI, 0);
        this.attributes.setAttributeValue(AttributeTypeEnum.QI_BASE_CAPACITY, 100);
        this.attributes.setAttributeValue(AttributeTypeEnum.BODY, 1);
        this.attributes.setAttributeValue(AttributeTypeEnum.BODY_CAPACITY, 100);
        this.attributes.setAttributeValue(AttributeTypeEnum.COIN, 0);
        this.attributes.setAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE, 0);
        this.attributes.setAttributeValue(AttributeTypeEnum.ENERGY_REALM_PERFECTION, 0);
        this.attributes.setAttributeValue(AttributeTypeEnum.ALLIES, 0);
        this.attributes.setAttributeValue(AttributeTypeEnum.SOUL, 1);
        this.attributes.setAttributeValue(AttributeTypeEnum.TALENT, 1);
        this.updateAllStats();
    }

    /**
    * Reset values on game start or game hard reset
    */
    resetToGameStart() {
        this.permanentItemList = new Set<ItemIdEnum>();
        this.zoneClearedList = new Set<ZoneIdEnum>();
        this.fightingExperience = new FightingExperience;
        this.resetDefaultValues();
    }

    private getAttributeValueOr0(attribute: AttributeTypeEnum) {
        return this.attributes.getAttributeValue(attribute) || 0;
    }

    updateAttributesFromActivity(id: ActivityEnum) {
        if ([ActivityEnum.PRACTICE_MARTIAL_ARTS, ActivityEnum.PRACTICE_QI_SPELLS].includes(id)) {
            this.updateAllStats();
        }
    }

    private updateAllStats() {    
        this.updateQiCapacity();
        this.updatePower();
        this.updateHealth();
    }

    private updateQiCapacity() {
        const qiBaseCapacity = this.getAttributeValueOr0(AttributeTypeEnum.QI_BASE_CAPACITY);
        const bodyToQiCapacity = ((this.getAttributeValueOr0(AttributeTypeEnum.BODY) - 1)
            * this.getAttributeValueOr0(AttributeTypeEnum.TALENT)
            * this.BODY_TO_QI_CAPACITY_RATIO);
        this.attributes.setAttributeValue(AttributeTypeEnum.QI_TOTAL_CAPACITY, (qiBaseCapacity + bodyToQiCapacity))
    }

    private updatePower() {
        const actMartialArts = 1 + (ActivitiesController.getActivityRank(ActivityEnum.PRACTICE_MARTIAL_ARTS) / this.martialArtsMod);
        const actPracticeSpells = 1 + (ActivitiesController.getActivityRank(ActivityEnum.PRACTICE_QI_SPELLS) / this.qiSpellsMod)

        const appliedBodyPower = this.getBody() * this.bodyToPowerRatio * actMartialArts;
        const appliedQiPower = this.getQi() * this.qiToPowerRatio * actPracticeSpells;
        const appliedFightingLevel = 1 + (this.fightingExperience.getLevel() * this.POWER_RAISE_PER_LEVEL)
        const appliedInternalInjury = 1 - (this.getAttributeValueOr0(AttributeTypeEnum.INTERNAL_DAMAGE) / 100)

        let weaponMod = 0;
        let allyMod = 1;
        this.inventoryList.filter(item => [ItemTypeEnum.WEAPON, ItemTypeEnum.ALLY].includes(item.type))
            .map(item => item.getEffectsWithUpgrade())
            .flat()
            .filter(effect => effect.attribute = AttributeTypeEnum.POWER)
            .forEach(effect => {
                if (effect.modifierType == ModifierTypeEnum.ADD) {
                    weaponMod += effect.value;
                } else if (ModifierTypeEnum.MULTI) {
                    allyMod += effect.value;
                }
        });

        const baseSummedPower = (appliedBodyPower + appliedQiPower + weaponMod);

        const finalPower = baseSummedPower * allyMod * appliedFightingLevel * appliedInternalInjury;
        this.attributes.setAttributeValue(AttributeTypeEnum.POWER, Utilities.roundTo2Decimal(finalPower));
    }

    private updateHealth() {
        const actMartialArts = 1 + (ActivitiesController.getActivityRank(ActivityEnum.PRACTICE_MARTIAL_ARTS) / this.martialArtsMod);
        const actPracticeSpells = 1 + (ActivitiesController.getActivityRank(ActivityEnum.PRACTICE_QI_SPELLS) / this.qiSpellsMod)

        const appliedBodyHealth = (this.getBody() * this.bodyToHealthRatio * actMartialArts);
        const appliedQiHealth = (this.getQi() * this.qiToHealthRatio * actPracticeSpells);
        const appliedFightingLevel = 1 + (this.fightingExperience.getLevel() * this.HEALTH_RAISE_PER_LEVEL)
        const appliedInternalInjury = 1 - (this.getAttributeValueOr0(AttributeTypeEnum.INTERNAL_DAMAGE) / 100)

        let armorMod = 0;
        let allyMod = 1;
        this.inventoryList.filter(item => [ItemTypeEnum.ARMOR, ItemTypeEnum.ALLY].includes(item.type))
            .map(item => item.getEffectsWithUpgrade())
            .flat()
            .filter(effect => effect.attribute = AttributeTypeEnum.HEALTH)
            .forEach(effect => {
                if (effect.modifierType == ModifierTypeEnum.ADD) {
                    armorMod += effect.value;
                } else if (ModifierTypeEnum.MULTI) {
                    allyMod += effect.value;
                }
        });

        const baseSummedHealth = (appliedBodyHealth + appliedQiHealth + armorMod);

        const finalHealth = baseSummedHealth * allyMod * appliedFightingLevel * appliedInternalInjury;
        this.attributes.setAttributeValue(AttributeTypeEnum.HEALTH, Utilities.roundTo2Decimal(finalHealth));
    }

    getQiCapPercent(){
        return this.getAttributeValueOr0(AttributeTypeEnum.QI) / this.getAttributeValueOr0(AttributeTypeEnum.QI_TOTAL_CAPACITY);
    }

    getBodyCapPercent() {
        return this.getAttributeValueOr0(AttributeTypeEnum.BODY) / this.getAttributeValueOr0(AttributeTypeEnum.BODY_CAPACITY);
    }

    getBodyGainWithTalent() {
        const bodyCapPercent = Utilities.roundTo2Decimal(this.getBodyCapPercent());
        const distanceToPeakMod = 1 - (bodyCapPercent - 0.1);
        return this.baseBodyGain * this.ageGainModifier * distanceToPeakMod * this.getAttributeValueOr0(AttributeTypeEnum.TALENT);
    }

    //base gain applied talent
    getQiGainWithTalent() {
        const qiCapPercent = Utilities.roundTo2Decimal(this.getQiCapPercent());
        const distanceToPeakMod = 1 - (qiCapPercent - 0.1);
        return this.baseQiGain * this.ageGainModifier * distanceToPeakMod * this.getAttributeValueOr0(AttributeTypeEnum.TALENT);
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

    setQiBaseMinCapacity(value: number) {
        this.attributes.setAttributeValue(AttributeTypeEnum.QI_BASE_CAPACITY, value);
        this.updateAllStats();
    }

    setAttributeValue(attribute: AttributeTypeEnum, value: number) {
        this.attributes.setAttributeValue(attribute, value);
        this.updateAllStats();
    }

    increaseAttribute(attribute: AttributeTypeEnum, value: number) {
        switch(attribute) {
            case AttributeTypeEnum.QI:
                this.increaseQi(value);
                break;
            case AttributeTypeEnum.BODY:
                this.increaseBody(value);
                break;
            case AttributeTypeEnum.INTERNAL_DAMAGE:
                const currentInternalDamage = this.getAttributeValueOr0(AttributeTypeEnum.INTERNAL_DAMAGE);
                if (value < 0) {
                    if (currentInternalDamage + value <= 0) {
                        value = -currentInternalDamage;
                    }
                    this.attributes.addAttributeValue(attribute, value);
                    this.updateAllStats();
                } else {
                    
                    if (currentInternalDamage < 100) {
                        if ((currentInternalDamage + value) >= 100) {
                            value = 100 - currentInternalDamage;
                        }
                        this.attributes.addAttributeValue(attribute, value);
                        this.updateAllStats();
                    }
                }
                break;
            case AttributeTypeEnum.LIFESPAN:
                this.attributes.addAttributeValue(attribute, value);
                this.updateAgeGainModifier();
                break;
            default:
                this.attributes.addAttributeValue(attribute, value);
                this.updateAllStats();
                break;
        }

    }

    //pure increase on stat
    private increaseQi(value: number) {
        const qiTotalCapacity = this.getAttributeValueOr0(AttributeTypeEnum.QI_TOTAL_CAPACITY);
        const currentQi = this.getAttributeValueOr0(AttributeTypeEnum.QI);
        if (currentQi < qiTotalCapacity) {
            if (currentQi + value >= qiTotalCapacity) {
                value = qiTotalCapacity - currentQi;
            }
            this.attributes.addAttributeValue(AttributeTypeEnum.QI, value);
            this.updateAllStats();
        }
    }

    //pure increase on stat
    private increaseBody(value: number) {
        const bodyCapacity = this.getAttributeValueOr0(AttributeTypeEnum.BODY_CAPACITY);
        const currentBody = this.getAttributeValueOr0(AttributeTypeEnum.BODY);
        if (currentBody < bodyCapacity) {
            if (currentBody + value >= bodyCapacity) {
                value = bodyCapacity - currentBody;
            }
            this.attributes.addAttributeValue(AttributeTypeEnum.BODY, value);

            this.updateAllStats();
        }
    }

    /**
     * A count of how many ALLY type upgrades the character has.
     */
    getAllyCount() {
        return this.inventoryList.filter(item => item.type == ItemTypeEnum.ALLY).length;
    }

    /**
     * Current total power
     * Qi affects power more than Body
     */
    getFightingPower() {
        return this.attributes.getAttributeValue(AttributeTypeEnum.POWER);
    }

    /**
     * Current total power
     * Qi affects power more than Body
     */
    getHealth() {
        return this.attributes.getAttributeValue(AttributeTypeEnum.HEALTH);
    }

    getAttributeValue(attribute: AttributeTypeEnum) {
        return this.getAttributeValueOr0(attribute);
    }

    addFightingExperience(value: number) {
        this.fightingExperience.addFightingExperience(value);
        this.updateAllStats();
    }

    getLevel() : Readonly<number> {
        return this.fightingExperience.getLevel();
    }

    getLevelStatus() {
        return this.fightingExperience.getLevelStatus();
    }

    addItemInventory(item: Item) {
        this.inventoryList.push(item);
        this.updateAllStats();
    }

    upgradeItemEffect(item: Item) {
        this.inventoryList.find(it => it.id == item.id)?.upgradeItem();
        this.updateAllStats();
    }

    age1Year() {
        this.year += 1;
        this.updateAgeGainModifier();
    }

    private updateAgeGainModifier() {
        const lifespanLeftPercent = Utilities.roundTo2Decimal(this.year / this.getAttributeValueOr0(AttributeTypeEnum.LIFESPAN));
        if (lifespanLeftPercent >= this.declineAgeMeter) {
            this.ageGainModifier = 1 - (lifespanLeftPercent - 0.1);
        } else {
            this.ageGainModifier = 1;
        }
    }

    getAgeGainModifier() : Readonly<number> {
        return this.ageGainModifier;
    }

    getAgeDeclineStart() {
        return this.getAttributeValueOr0(AttributeTypeEnum.LIFESPAN) * this.declineAgeMeter;
    }

    importSaveData(dataObject: Partial<Record<string, unknown>>) {
        //empty object is not processed
        if (!dataObject) {
            return;
        }
  
        //character age
        this.year = dataObject['year'] as number;
        // translate realmId into realm
        this.energyRealm = EnergyRealmController.getRealmById(dataObject['energyRealmId'] as EnergyRealmEnum);
        // translate realmId into realm
        this.bodyRealm = BodyRealmController.getRealmById(dataObject['bodyRealmId'] as BodyRealmEnum);
        //translate entries array to map
        (dataObject['attributes'] as Array<[AttributeTypeEnum, number]>)
            .forEach(([attr, value]) => this.attributes.setAttributeValue(attr, value));
        // unwraps fighting experience data
        const expObj = dataObject['fightingExperience'] as Record<string, any>;
        this.fightingExperience = new FightingExperience(
            expObj['level'] as number,
            expObj['experience'] as number,
            expObj['experienceNextLevel'] as number
        )
        //list of permanent items
        this.permanentItemList.clear();
        (dataObject['permanentItemList'] as Array<ItemIdEnum>).forEach(itemId => this.permanentItemList.add(itemId));
        //list of cleared zones
        (dataObject['zoneClearedList'] as Array<ZoneIdEnum>).forEach(itemId => this.zoneClearedList.add(itemId));
        //translate itemId to item
        this.inventoryList = [];
        (dataObject['inventoryList'] as Array<ItemIdEnum>).forEach(itemId => {
            const item = ItemController.getItemById(itemId);
            if (item) {
                this.inventoryList.push(item);
            } else {
                console.error('Something went wrong when importing items to character')
            }
        });
    }

    performDataUpdate() {
        //update data
        this.updateAllStats();
        this.updateAgeGainModifier();
    }

    toExportFormat() : Record<string, any> {
        return {
            //character age
            year: this.year,
            // translate realm into id
            energyRealmId: this.energyRealm.id,
            // translate realm into id
            bodyRealmId: this.bodyRealm.id,
            //translate object and map into entries array
            attributes: this.attributes.toExportFormat(),
            // encapsulates fighting experience
            fightingExperience: this.fightingExperience.toExportFormat(),
            //list of permanent items
            permanentItemList: this.permanentItemList.values().toArray(),
            //list of cleared zones
            zoneClearedList: this.zoneClearedList.values().toArray(),
            //translate item to itemId
            inventoryList: this.inventoryList.map(item => item.id)
        };
    }

}