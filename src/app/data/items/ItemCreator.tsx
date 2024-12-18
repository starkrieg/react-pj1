import { ItemController } from "./ItemController";
import { ItemIdEnum } from "./ItemIdEnum";
import { ItemTypeEnum } from "./ItemTypeEnum";

export default class ItemCreator {

    static createItemPool() {
        ItemController.createItem(
            ItemIdEnum.BOOK_QI_CULTIVATION,
            ItemTypeEnum.PERMANENT,
            'Qi Cultivation Technique'
        )
        ItemController.createItem(
            ItemIdEnum.BOOK_CULTIVATION_OF_SELF,
            ItemTypeEnum.PERMANENT,
            'Book on meditation practices and inner mind'
        );
        ItemController.createItem(
            ItemIdEnum.BOOK_QI_MANIPULATION,
            ItemTypeEnum.PERMANENT,
            'Teachings on achieving different effects with Qi'
        );
        ItemController.createItem(
            ItemIdEnum.BOOK_FORAGING_MANUAL,
            ItemTypeEnum.PERMANENT,
            'Book on plants and minerals'
        );
        ItemController.createItem(
            ItemIdEnum.BOOK_PHYSICAL_TRAINING,
            ItemTypeEnum.PERMANENT,
            'Teachings on strengthening one\'s body with exercise'
        );
        ItemController.createItem(
            ItemIdEnum.BOOK_BODY_REFINING,
            ItemTypeEnum.PERMANENT,
            'Teachings on going beyond the body\'s limits and breakthrough'
        );
        ItemController.createItem(
            ItemIdEnum.BOOK_MARTIAL_ARTS,
            ItemTypeEnum.PERMANENT,
            'Teachings on combat techniques for increased survival'
        );
        ItemController.createItem(
            ItemIdEnum.BOOK_INNER_REGION,
            ItemTypeEnum.PERMANENT,
            'Knowledge on areas surrounding small village up to the myriad beast valley'
        );
        ItemController.createItem(
            ItemIdEnum.BOOK_OUTER_REGION,
            ItemTypeEnum.PERMANENT,
            'Knowledge on areas beyond the myriad beast valley'
        );
    }

}