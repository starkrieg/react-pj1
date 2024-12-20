import { AttributeEffect } from "../common/AttributeEffect";
import { Item } from "../items/Item";
import { ErrorController } from "../utils/ErrorController";
import { ItemMarketZone } from "./ItemGreatZoneEnum";
import { ItemIdEnum } from "./ItemIdEnum";
import { ItemTypeEnum } from "./ItemTypeEnum";

export class ItemController {

    // map for all items by id
    private static itemMap = new Map<ItemIdEnum, Item>();

    static reset() {
        this.itemMap.clear();
    }

    /**
     * Use item id to find item instance on the list
     * @param id item id
     * @returns the Item instance
     */
    static getItemById(id: ItemIdEnum | undefined) {
        if (id && this.itemMap.get(id)) {
            return this.itemMap.get(id);
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    /**
     * Create an item and add it to the list
     * @param id item id
     * @param type item type, based on ItemTypeEnum
     * @return a reference to the created item
     */
    static createItem(id: ItemIdEnum, type: ItemTypeEnum, name: string, description: string, 
        itemZone: ItemMarketZone = ItemMarketZone.NONE, effects: AttributeEffect[] = []) : Item | undefined {
        if (!type || !name) {
            ErrorController.throwSomethingWrongError();
            return undefined
        }

        const item = new Item(id, type, itemZone, name, description, effects);
        this.itemMap.set(id, item);
        return item;
    }

    /**
     * Create an item and add it to the list
     * This item will be permanent - it will stay across deaths
     * @param id item id
     * @param type item type, based on ItemTypeEnum
     */
    static createPermanentItem(id: ItemIdEnum, name: string, description: string) {
        if (!name) {
            ErrorController.throwSomethingWrongError();
            return
        }

        const item = new Item(id, ItemTypeEnum.PERMANENT, ItemMarketZone.NONE, name, description, []);
        this.itemMap.set(id, item);
    }
    
}