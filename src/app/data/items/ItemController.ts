import { Item } from "../items/Item";
import { ErrorController } from "../utils/ErrorController";
import { ItemIdEnum } from "./ItemIdEnum";
import { ItemTypeEnum } from "./ItemTypeEnum";

export class ItemController {

    // map for all items by id
    private static itemMap = new Map<ItemIdEnum, Item>();

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
     */
    static createItem(id: ItemIdEnum, type: ItemTypeEnum, name: string) {
        if (!id || !type || !name) {
            ErrorController.throwSomethingWrongError();
            return
        }

        const item = new Item(id, type, name);
        this.itemMap.set(id, item);
    }
    
}