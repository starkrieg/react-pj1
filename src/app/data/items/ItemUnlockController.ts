import { ActivitiesController } from "../activities/ActivitiesController";
import { CultivateQi } from "../activities/CultivateQi";
import { ExplorationController } from "../exploration/ExplorationController";
import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ErrorController } from "../utils/ErrorController";
import { ItemIdEnum } from "./ItemIdEnum";

export class ItemUnlockController {

    static unlockThingsFromItem(itemId: ItemIdEnum | undefined) {
        if (!itemId) {
            ErrorController.throwSomethingWrongError();
            return
        }

        //check what is unlocked after getting item

        switch(itemId) {
            case ItemIdEnum.QI_CULTIVATION_KNOWLEDGE:
                //unlock activity to cultivate qi
                ActivitiesController.createActivity(new CultivateQi());
                
                //unlock zone forest outside village
                ExplorationController.createExplorableZone(
                    ExploreZoneIdEnum.FOREST_OUTSIDE_VILLAGE_1,
                    'Forest outside village',
                    'Many trees and some rough paths. Watch out for animals or bandits.',
                    10,
                    2,
                    [
                        ItemIdEnum.HAUNTED_HOUSE_KEY
                    ]
                );
                break;
            case ItemIdEnum.HAUNTED_HOUSE_KEY:
                //unlock zone forest outside village
                ExplorationController.createExplorableZone(
                    ExploreZoneIdEnum.VILLAGE_HAUNTED_HOUSE,
                    'Old and scary house inside the village',
                    'Run down and moldy, an old house known for being cursed',
                    20,
                    100,
                    [
                        //no reward right now
                    ]
                );
                break;
            default:
                //this item unlocks nothing
                console.log(`This item unlocks nothing : ${itemId}`)
        }

    }

}