import { CharacterController } from "../character/CharacterController";
import { ActivitiesController } from "./ActivitiesController";
import { ActivityEnum } from "./ActivityEnum";
import { Activity } from "./Activity";

export class OddJobs implements Activity {
    
    id: ActivityEnum;
    title: string;
    desc: string;
    
    action: CallableFunction;

    constructor() {
        this.id = ActivityEnum.ODD_JOBS;
        this.title = 'Odd jobs';
        this.desc = 'Perform odd jobs to receive some coins.';
        
        this.action = () => {
            //use rank to affect the value
            const tickGain = this.getTickGain();
            CharacterController.increaseMoney(tickGain);

            ActivitiesController.incrementExpActivity(this.id);
        }
    }

    getTickGain() {
        const bruteValue = 1;
        const bodyToMoneyDifferential = 25;
        const daysPerFullGain = 2;
        const valueBeforeRank = bruteValue + (CharacterController.getCharacter().getBody() / bodyToMoneyDifferential);
        const rankMult = 1 + ((ActivitiesController.getActivityRank(this.id) - 1 ) * 0.05);
        return ( valueBeforeRank * rankMult / daysPerFullGain);
    }

}