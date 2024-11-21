import { Item } from "../items/Item";
import { ItemIdEnum } from "./ItemIdEnum";
import { ItemTypeEnum } from "./ItemTypeEnum";

export class ItemController {

    // map for all items by id
    itemMatrix = new Map<ItemIdEnum, Item>();

    /**
     * Use item id to find item instance on the list
     * @param id item id
     * @returns the Item instance
     */
    getItemById(id: ItemIdEnum) {
        if (this.itemMatrix.get(id)) {
            return this.itemMatrix.get(id);
        } else {
            console.log('Something went wrong!');
            alert('Something went wrong! Please report this!');
        }
    }

    /**
     * Create an item and add it to the list
     * @param id item id
     * @param type item type, based on ItemTypeEnum
     */
    createItem(id: ItemIdEnum, type: ItemTypeEnum, name: string) {
        if (!id || !type || !name) {
            console.log('Something went wrong!');
            alert('Something went wrong! Please report this!');
        }

        const item = new Item(id, type, name);
        this.itemMatrix.set(id, item);
    }
}