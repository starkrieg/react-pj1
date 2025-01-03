import { ItemIdEnum } from "../items/ItemIdEnum";

export class ZoneLoot {

    itemId: ItemIdEnum;
    dropChance: number;

    //0 limit means unlimited amount of drops
    private limit: number;

    private dropped: number = 0;

    constructor(itemId: ItemIdEnum, dropChance: number, limit: number = 0) {
        this.itemId = itemId;
        this.dropChance = dropChance;
        this.limit = limit;
    }

    dropItem() {
        this.dropped+=1;
    }

    canDrop() {
        if (this.limit <= 0) {
            return true;
        } else {
            return this.dropped < this.limit;
        }
    }

}
