import { ItemIdEnum } from "../items/ItemIdEnum";

export class ZoneLootVO {

    itemId: ItemIdEnum;
    name: string;
    dropChance: number;

    isLimited: boolean;

    constructor(itemId: ItemIdEnum, name: string, dropChance: number, isLimited: boolean) {
        this.itemId = itemId;
        this.name = name;
        this.dropChance = dropChance;
        this.isLimited = isLimited;
    }

}
