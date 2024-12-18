import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ActivitiesController } from "./ActivitiesController";
import { Activity } from "./Activity";
import { ActivityEnum } from "./ActivityEnum";

export class GenericActivity implements Activity {
    
    id: ActivityEnum;
    title: string;
    desc: string;
    action: CallableFunction;
    unlockRequirements;
    
    getTickGain(): number {
        throw new Error("Method not implemented.");
    }
    
    constructor(id: ActivityEnum, title: string, desc: string,
        unlockRequirements: (ItemIdEnum | ExploreZoneIdEnum)[]
    ) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.unlockRequirements = unlockRequirements;

        this.action = () => {
            ActivitiesController.incrementExpActivity(this.id);
        }
    }
}