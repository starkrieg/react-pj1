import { CharacterController } from "../character/CharacterController";
import { ActivitiesController } from "./ActivitiesController";
import { ActivityEnum } from "./ActivityEnum";
import { Activity } from "./Activity";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";

export class PerformOddJobs implements Activity {
    
    id: ActivityEnum;
    title: string;
    desc: string;
    
    action: CallableFunction;

    unlockRequirements: [] = [];

    constructor() {
        this.id = ActivityEnum.PERFORM_ODD_JOBS;
        this.title = 'Perform Odd Jobs';
        this.desc = 'Perform odd jobs to receive some coins.';
        
        this.action = () => {
            //use rank to affect the value
            const tickGain = this.getTickGain();
            CharacterController.increaseAttribute(AttributeTypeEnum.COIN, tickGain);

            ActivitiesController.incrementExpActivity(this.id);
        }
    }

    getTickGain() {
        const bruteValue = 1;
        const bodyToCoinsRatio = 25;
        const daysPerFullGain = 2;
        const valueBeforeRank = bruteValue + (CharacterController.getCharacter().getBody() / bodyToCoinsRatio);
        const rankMult = 1 + ((ActivitiesController.getActivityRank(this.id) - 1 ) * 0.05);
        return ( valueBeforeRank * rankMult / daysPerFullGain);
    }

}