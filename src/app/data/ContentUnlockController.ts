import { ActivitiesController } from "./activities/ActivitiesController";
import ActivityPool from "./activities/ActivityPool";
import { CharacterController } from "./character/CharacterController";
import { ExplorationController } from "./exploration/ExplorationController";
import ZonePool from "./exploration/ZonePool";

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
                    .every(req => CharacterController.isHaveItem(req));

                if (isAllRequirementsMet) {
                    ActivitiesController.addActivity(act);
                }
            }
        });
    }

    private static unlockZones() {
        const zonePool = ZonePool.getZonePool();
        const unlockedZones = ExplorationController.getListExplorableZones();
        zonePool.filter(zone => !unlockedZones.includes(zone))
            .forEach(zone => {
            if (zone.unlockRequirements.length == 0) {
                ExplorationController.addExplorableZone(zone);
            } else {
                const isAllRequirementsMet = zone.unlockRequirements
                    .every(req => CharacterController.isHaveItem(req));

                if (isAllRequirementsMet) {
                    ExplorationController.addExplorableZone(zone);
                }
            }
        });
    }

}