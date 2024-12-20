import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { ModifierTypeEnum } from "../common/ModifierTypeEnum";
import { Item } from "../items/Item";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { Utilities } from "../utils/Utilities";
import { RequirementInterface } from "./RequirementInterface";

export class MarketItem { 

    baseItem: Item;
    cost: number;
    name: string;
    description: string = '';
    isUpgrade: boolean = false;
    requirements: RequirementInterface[];

    constructor(item: Item, cost: number, requirements: RequirementInterface[] = []) {
        this.baseItem = item;
        this.cost = cost;
        this.name = item.name;
        this.requirements = requirements;
        this.updateMarketDescription();
    }

    updateMarketDescription() {
        const increaseTypes = [ModifierTypeEnum.ADD, ModifierTypeEnum.MULTI];
        const addOrSubType = [ModifierTypeEnum.ADD, ModifierTypeEnum.SUB];
        const healthAttributeTypes = [AttributeTypeEnum.HEALTH, AttributeTypeEnum.INTERNAL_DAMAGE]
        const isPill = this.baseItem.type == ItemTypeEnum.CONSUMABLE;

        function toFirstLetterUppercase(text: string) {
            return text.split('-').map(word => {
                return word.at(0)?.toUpperCase() + word.substring(1);
            }).join(' ');
        }

        const effects = this.isUpgrade ? this.baseItem.getEffectsWithUpgrade(this.baseItem.upgrades+1) 
            : this.baseItem.effects;
        this.description = effects.map(effect => {

            const effectWithUpgrade = Utilities.roundTo2Decimal(effect.value);

            const descValue = addOrSubType.includes(effect.modifierType) ? effectWithUpgrade 
                : `${(effectWithUpgrade*100)}%`

            if (this.isUpgrade && [ItemTypeEnum.WEAPON, ItemTypeEnum.ARMOR]) {
                return `${toFirstLetterUppercase(effect.attribute)} ${descValue}`;
            } else {
                let verb = increaseTypes.includes(effect.modifierType) ? 'Increases' : 'Decreases'
                if (isPill && healthAttributeTypes.includes(effect.attribute)) {
                    verb = 'Heals'
                }
                return `${verb} ${toFirstLetterUppercase(effect.attribute)} by ${descValue}`;
            }
        }).join(`\n`);
    }

    resetName() {
        this.name = this.baseItem.name;
    }

}