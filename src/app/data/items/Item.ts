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

    //identification for the item
    id: ItemIdEnum;

    //item type, based on enum
    type: ItemTypeEnum;

    //readable for the item - printed on message console when acquired
    name: string

    constructor(id: ItemIdEnum, type: ItemTypeEnum, name: string) {
        this.id = id;
        this.type = type;
        this.name = name;
    }

}