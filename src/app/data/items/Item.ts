import { AttributeEffect } from "../common/AttributeEffect";
import { ItemMarketZone } from "./ItemGreatZoneEnum";
import { ItemIdEnum } from "./ItemIdEnum";
import { ItemTypeEnum } from "./ItemTypeEnum";

/**
 * base for all items
 * can be a consumable item (life only) - e.g. healing pill
 * can be an unique item (life only) - e.g. weapon with effect
 * can directly unlock a new thing (life only) - e.g. next zone
 * can directly unlock a new thing (permanent) - e.g. new activity, new secret zone, new realm
 */
export class Item {

    private readonly MAX_UPGRADE = 3;
    readonly UPGRADE_GROWTH_MOD = 1.25;

    //identification for the item
    id: ItemIdEnum;

    //item type, based on enum
    type: ItemTypeEnum;

    // greater zone which the items belongs to
    // used to restrict item available on specific areas and market
    itemZone: ItemMarketZone;

    //printed on message board as loot / appears on market
    name: string;

    //appear on market and inventory
    description: string;

    //list of effects an item can have
    effects: AttributeEffect[]

    //amount of time this tem has been upgraded
    //affects the original effects and market price
    upgrades: number = 0;

    constructor(id: ItemIdEnum, type: ItemTypeEnum, itemZone: ItemMarketZone = ItemMarketZone.NONE, 
        name: string, description: string, effects: AttributeEffect[]) {
        this.id = id;
        this.type = type;
        this.itemZone = itemZone;
        this.name = name;
        this.description = description;
        this.effects = effects;
    }

    canUpgrade() {
        return [ItemTypeEnum.WEAPON, ItemTypeEnum.ARMOR].includes(this.type) && this.upgrades < this.MAX_UPGRADE;
    }

    upgradeItem() {
        this.upgrades+= 1;
    }

    getEffectsWithUpgrade(upgradeValue: number = this.upgrades) {
        return this.effects.map(effect => {
            return new AttributeEffect(
                effect.attribute, 
                effect.modifierType,
                effect.value * Math.pow(this.UPGRADE_GROWTH_MOD, upgradeValue)
            );
        });
    }

}