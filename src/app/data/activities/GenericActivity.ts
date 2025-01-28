import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ActivitiesController } from "./ActivitiesController";
import { IActivity } from "./IActivity";
import { ActivityEnum } from "./ActivityEnum";

export class GenericActivity implements IActivity {
    
    id: ActivityEnum;
    title: string;
    desc: string;
    action: CallableFunction;
    unlockRequirements: (ItemIdEnum | ZoneIdEnum)[]
    gainDesc: string;
    
    getTickGain(): number {
        return (ActivitiesController.getActivityRank(this.id));
    }
    
    constructor(id: ActivityEnum, title: string, desc: string,
        gainDesc: string,
        unlockRequirements: (ItemIdEnum | ZoneIdEnum)[]
    ) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.gainDesc = gainDesc;
        this.unlockRequirements = unlockRequirements;

        this.action = () => {
            ActivitiesController.incrementExpActivity(this.id);
        }
    }
}