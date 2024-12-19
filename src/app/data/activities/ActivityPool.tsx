import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ErrorController } from "../utils/ErrorController";
import { Activity } from "./Activity";
import { ActivityEnum } from "./ActivityEnum";
import { CultivateQi } from "./CultivateQi";
import { GenericActivity } from "./GenericActivity";
import { PerformOddJobs } from "./PerformOddJobs";
import { PhysicalTraining } from "./PhysicalTraining";

export default class ActivityPool {

    private static activityPool: Activity[] = [];

    static getActivityPool() : Readonly<Activity[]> {
        return this.activityPool;
    }

    /**
     * Create an activity and add it to the list
     * @param activity activity object
     */
    private static createActivity(activity: Activity) {
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
            [
                //requirements
                ItemIdEnum.BOOK_CULTIVATION_OF_SELF
            ]
        ));
        this.createActivity(new GenericActivity(
            ActivityEnum.REFINE_QI,
            'Refine and Manipulate Qi',
            'Practice using Qi to achieve different results',
            [
                //requirements
                ItemIdEnum.BOOK_QI_MANIPULATION
            ]
        ));
        this.createActivity(new CultivateQi());
        this.createActivity(new GenericActivity(
            ActivityEnum.STUDY_FORAGING,
            'Study plants and minerals',
            'Improve your knowledge to find better resources',
            [
                //requirements
                ItemIdEnum.BOOK_FORAGING_MANUAL
            ]
        ));
        this.createActivity(new PhysicalTraining());
        this.createActivity(new GenericActivity(
            ActivityEnum.REFINE_BODY,
            'Refine your body',
            'Work to increase your body\'s upper limits',
            [
                //requirements
                ItemIdEnum.BOOK_BODY_REFINING
            ]
        ));
        this.createActivity(new GenericActivity(
            ActivityEnum.PRACTICE_MARTIAL_ARTS,
            'Practice Martial Arts',
            'Train to better use your body on battle',
            [
                //requirements
                ItemIdEnum.BOOK_MARTIAL_ARTS
            ]
        ));
        this.createActivity(new GenericActivity(
            ActivityEnum.VILLGE_GUARD_DUTIES,
            'Village Guard Duty',
            'Part time work as a guard at the village',
            [
                //requirements
                ExploreZoneIdEnum.VILLAGE_SOLDIERS_BOOTCAMP
            ]
        ));
        
    }

}