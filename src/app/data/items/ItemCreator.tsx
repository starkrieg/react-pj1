import { ItemController } from "./ItemController";
import { ItemIdEnum } from "./ItemIdEnum";
import { ItemTypeEnum } from "./ItemTypeEnum";

export default class ItemCreator {

    static createItems() {
        ItemController.createItem(
            ItemIdEnum.QI_CULTIVATION_KNOWLEDGE,
            ItemTypeEnum.PERMANENT,
            'Qi Cultivation Technique'
        )
        ItemController.createItem(
            ItemIdEnum.CULTIVATION_FOUNDATION_KNOWLEDGE,
            ItemTypeEnum.PERMANENT,
            'Cultivation Foundation Knowledge'
        );
        ItemController.createItem(
            ItemIdEnum.FOREST_MAP,
            ItemTypeEnum.PERMANENT,
            'A guide on the outside forest and its surroundings'
        );
        ItemController.createItem(
            ItemIdEnum.HAUNTED_HOUSE_KEY,
            ItemTypeEnum.TEMPORARY,
            'An iron key that unlocks a door somewhere'
        );
    }

}