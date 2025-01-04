import { CharacterController } from "../character/CharacterController";
import { ActivitiesController } from "./ActivitiesController";
import { ActivityEnum } from "./ActivityEnum";
import { IActivity } from "./IActivity";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { Utilities } from "../utils/Utilities";
import { ItemIdEnum } from "../items/ItemIdEnum";

export class PerformOddJobs implements IActivity {
    
    id: ActivityEnum;
    title: string;
    desc: string;
    
    action: CallableFunction;

    unlockRequirements: [] = [];

    readonly BASE_DAYS_COIN_GAIN = 4;
    private countDays = 0;

    constructor() {
        this.id = ActivityEnum.PERFORM_ODD_JOBS;
        this.title = 'Perform Odd Jobs';
        this.desc = 'Perform odd jobs to receive some coins.';
        
        this.action = () => {
            this.countDays += 1;

            const effectiveDays = this.getEffectiveWorkDays();

            if (this.countDays >= effectiveDays) {
                this.countDays = 0;
                //use rank to affect the value
                const tickGain = this.getTickGain();
                CharacterController.increaseAttribute(AttributeTypeEnum.COIN, tickGain);
            }
            ActivitiesController.incrementExpActivity(this.id);
        }
    }

    getEffectiveWorkDays() {
        const dayMod1 = CharacterController.isHaveItem(ItemIdEnum.BOOK_NOTES_ON_PEOPLE);
        const offDays = dayMod1 ? 1 : 0;
        return this.BASE_DAYS_COIN_GAIN - offDays;
    }

    getTickGain() {
        const bruteValue = 1;
        const valueBeforeRank = bruteValue;
        const rankMult = 1 + (ActivitiesController.getActivityRank(this.id) * 0.05);

        //for odd jobs rank 100
        const workingToolsMod = CharacterController.isHaveItem(ItemIdEnum.ITEM_WORKING_TOOLS) 
            ? 2 : 1;
        
        //for odd jobs rank 200
        const shopkeepingMod = CharacterController.isHaveItem(ItemIdEnum.BOOK_SHOPKEEPING_MANUAL) 
            ? 2 : 1;

        //for odd jobs rank 300
        const openBusinessMod = CharacterController.isHaveItem(ItemIdEnum.SELF_OPEN_BUSINESS) 
            ? 2 : 1;

        //for odd jobs rank 400
        const underhandedMethodsMod = CharacterController.isHaveItem(ItemIdEnum.BOOK_UNDERHANDED_METHODS_I) 
            ? 2 : 1;
        
        
        const itemMods = workingToolsMod * shopkeepingMod * openBusinessMod * underhandedMethodsMod;

        return Utilities.roundTo0Decimal( valueBeforeRank * itemMods * rankMult );
    }

}