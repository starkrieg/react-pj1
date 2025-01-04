import { ItemIdEnum } from "../items/ItemIdEnum";
import { ErrorController } from "../utils/ErrorController";
import { IActivity } from "./IActivity";
import { ActivityEnum } from "./ActivityEnum";
import { CultivateQi } from "./CultivateQi";
import { GenericActivity } from "./GenericActivity";
import { PerformOddJobs } from "./PerformOddJobs";
import { PhysicalTraining } from "./PhysicalTraining";

export default class ActivityPool {

    private static activityPool: IActivity[] = [];

    static getActivityPool() : Readonly<IActivity[]> {
        return this.activityPool;
    }

    /**
     * Create an activity and add it to the list
     * @param activity activity object
     */
    private static createActivity(activity: IActivity) {
        if (!activity) {
            ErrorController.throwSomethingWrongError();
        }
        this.activityPool.push(activity);
    }

    static createActivityPool() {
        this.createActivity(new PerformOddJobs());
        this.createActivity(new GenericActivity(
            ActivityEnum.MEDITATE,
            'Meditate',
            'Meditate and develop your inner mind',
            'Increase activity speed',
            [
                //requirements
                ItemIdEnum.BOOK_MEDITATE_ON_SELF
            ]
        ));
        this.createActivity(new GenericActivity(
            ActivityEnum.PRACTICE_QI_SPELLS,
            'Practice Qi Spells',
            'Practice your Qi spellcasting',
            'Increase Qi effects on Power and Health',
            [
                //requirements
                ItemIdEnum.BOOK_QI_SPELLS
            ]
        ));
        this.createActivity(new CultivateQi());
        this.createActivity(new GenericActivity(
            ActivityEnum.STUDY_FORAGING,
            'Study plants and minerals',
            'Improve your knowledge to find better resources',
            'Increase loot drop chance',
            [
                //requirements
                ItemIdEnum.BOOK_FORAGING_MANUAL
            ]
        ));
        this.createActivity(new PhysicalTraining());
        this.createActivity(new GenericActivity(
            ActivityEnum.PRACTICE_MARTIAL_ARTS,
            'Practice Martial Arts',
            'Train to better use your body on battle',
            'Increase Body effects on Power and Health',
            [
                //requirements
                ItemIdEnum.BOOK_MARTIAL_ARTS
            ]
        ));
        
    }

}