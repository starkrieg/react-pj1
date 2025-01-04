import { ActivitiesController } from "./activities/ActivitiesController";
import ActivityPool from "./activities/ActivityPool";
import { CharacterController } from "./character/CharacterController";
import { ExplorationController } from "./exploration/ExplorationController";
import { ZoneIdEnum } from "./exploration/ZoneIdEnum";
import ZonePool from "./exploration/ZonePool";
import { ItemIdEnum } from "./items/ItemIdEnum";

export class ContentUnlockController {

    static unlockContent() {
        this.unlockActivities();
        this.unlockZones();        
    }

    private static unlockActivities() {
        const actPool = ActivityPool.getActivityPool();
        const unlockedActivities = ActivitiesController.getActivitiesList();
        actPool.filter(act => !unlockedActivities.includes(act))
            .forEach(act => {
            if (act.unlockRequirements.length == 0) {
                ActivitiesController.addActivity(act);
            } else {
                const isAllRequirementsMet = act.unlockRequirements
                    .every(req => {
                        return CharacterController.isHaveItem(req as ItemIdEnum)
                            || CharacterController.isHaveZoneCleared(req as ZoneIdEnum);
                    });

                if (isAllRequirementsMet) {
                    ActivitiesController.addActivity(act);
                }
            }
        });
    }

    private static unlockZones() {
        const zonePool = ZonePool.getZonePool();
        const unlockedZones = ExplorationController.getListExplorableZonesVO().map(zoneVO => zoneVO.id);
        zonePool.filter(zone => !unlockedZones.includes(zone.id))
            .forEach(zone => {
            if (zone.unlockRequirements.length == 0) {
                ExplorationController.addExplorableZone(zone);
            } else {
                const isAllRequirementsMet = zone.unlockRequirements
                    .every(req => {
                        return CharacterController.isHaveItem(req as ItemIdEnum)
                            || CharacterController.isHaveZoneCleared(req as ZoneIdEnum);
                    });

                if (isAllRequirementsMet) {
                    ExplorationController.addExplorableZone(zone);
                }
            }
        });
    }

}