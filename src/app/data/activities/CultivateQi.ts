import { CharacterController } from "../character/CharacterController";
import { ActivitiesController } from "./ActivitiesController";
import { ActivityEnum } from "./ActivityEnum";
import { Activity } from "./Activity";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";

export class CultivateQi implements Activity {
    
    id: ActivityEnum;
    title: string;
    desc: string;
    
    action: CallableFunction;

    unlockRequirements: ItemIdEnum[];

    constructor() {
        this.id = ActivityEnum.CULTIVATE_QI;
        this.title = 'Cultivate Qi';
        this.desc = 'Cultivate your Qi';

        this.unlockRequirements = [
            ItemIdEnum.BOOK_QI_CULTIVATION
        ];

        this.action = () => {
            //use rank to affect the value
            const tickGain = this.getTickGain();
            CharacterController.increaseAttribute(AttributeTypeEnum.QI, tickGain);

            ActivitiesController.incrementExpActivity(this.id);
        }
    }

    getTickGain() {
        const cultivationMatMod = CharacterController.isHaveItem(ItemIdEnum.ITEM_CULTIVATION_MAT) 
            ? 2 : 1
        const bruteValue = CharacterController.getCharacter().getQiGainWithTalent();
        const rankMult = 1 + (ActivitiesController.getActivityRank(this.id) * 0.1);
        return ( bruteValue * cultivationMatMod * rankMult );
    }

}