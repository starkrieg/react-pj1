import { CharacterController } from "../character/CharacterController";
import { ActivitiesController } from "./ActivitiesController";
import { ActivityEnum } from "./ActivityEnum";
import { Activity } from "./Activity";
import { ItemIdEnum } from "../items/ItemIdEnum";

export class PhysicalTraining implements Activity {
    
    id: ActivityEnum;
    title: string;
    desc: string;
    
    action: CallableFunction;

    unlockRequirements: ItemIdEnum[];

    constructor() {
        this.id = ActivityEnum.PHYSICAL_TRAINING;
        this.title = 'Physical training';
        this.desc = 'Train your body to be stronger.';

        this.unlockRequirements = [
            ItemIdEnum.BOOK_PHYSICAL_TRAINING
        ];

        this.action = () => {
            //use rank to affect the value
            const tickGain = this.getTickGain();
            CharacterController.increaseBody(tickGain);
            
            ActivitiesController.incrementExpActivity(this.id);
        }
    }

    //baseBodyGain has talent already applied
    //the % of qi capacity filled increases body gain
    getTickGain() {
        const bruteValue = CharacterController.getCharacter().getBaseBodyGain();
        const currQiMulti = 1 + (CharacterController.getCharacter().getQiCapPercent());
        const rankMult = 1 + ((ActivitiesController.getActivityRank(this.id) - 1) * 0.1);
        return ( bruteValue * rankMult * currQiMulti);
    }

}