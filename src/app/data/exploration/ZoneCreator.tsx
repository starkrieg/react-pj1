import { ExplorationController } from "./ExplorationController";
import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";

export default class ZoneCreator {

    static createZones() {
        ExplorationController.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_DOJO,
            'Village Dojo',
            'Face off against some wood dolls and novice warriors',
            10,
            1,
            [
                ItemIdEnum.QI_CULTIVATION_KNOWLEDGE,
                ItemIdEnum.FOREST_MAP
            ]
        );
    }

}