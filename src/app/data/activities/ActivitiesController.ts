import { ErrorController } from "../utils/ErrorController";
import { ActivityEnum } from "./ActivityEnum";
import { Activity } from "./Activity";
import { ActivityRank } from "./ActivityRank";

export class ActivitiesController {

    private static BASE_TICK_RANK = 6;

    static selectedActivity: ActivityEnum = ActivityEnum.NOTHING;
    
    private static activitiesList: any[] = [];

    private static activityRankMap: Map<ActivityEnum, ActivityRank> = new Map<ActivityEnum, ActivityRank>();
    
    /**
     * Resets all data
     * Used on game hard reset
     */
    static hardReset() {
        this.selectedActivity = ActivityEnum.NOTHING;
        this.activitiesList = [];
        this.activityRankMap.clear();
    }

    /**
     * Resets superficial data, like selected activity and activities available
     * Used on character death
     */
    static softReset() {
        this.selectedActivity = ActivityEnum.NOTHING;
        this.activitiesList = [];
    }
    
    static getSelectedActivityTitle() {
        const title = this.activitiesList.find((act) => act.id == this.selectedActivity)?.title
        return title || 'Nothing';
    }
    
    static doActivityTick() {
        this.activitiesList.find((act) => act.id == this.selectedActivity)?.action();
    }
    
    static doSelectActivity(actId: ActivityEnum) {
        this.selectedActivity = actId;
    }

    /**
     * Create an activity and add it to the list
     * @param activity activity object
     */
    static createActivity(activity: Activity) {
        if (!activity) {
            ErrorController.throwSomethingWrongError();
        }
        this.activitiesList.push(activity);
        
        //only add to map if not there yet
        //so that map is not reset when creating activities after death
        if (!this.activityRankMap.has(activity.id)) {
            this.activityRankMap.set(activity.id, new ActivityRank(1, 0, this.BASE_TICK_RANK));
        }
    }

    static getActivitiesList() {
        return this.activitiesList;
    }

    static getActivityRankObj(id: ActivityEnum) : Readonly<ActivityRank> {
        return this.activityRankMap.get(id) || new ActivityRank(-1, 0, 0);
    }

    static getActivityRank(id: ActivityEnum) {
        const activityRank = this.activityRankMap.get(id);
        if (activityRank) {
            return activityRank.rank;
        } else {
            console.log(`Activity rank not found : activity ${id}`);
            return 1;
        }
    } 

    // every rank up increase total exp for next rank by 50%
    // increment exp by default 1
    static incrementExpActivity(id: ActivityEnum, value: number = 1) {
        const activityRank = this.activityRankMap.get(id);
        if (activityRank) {
            activityRank.exp += value;
            
            while (activityRank.exp >= activityRank.totalExpToNextRank) {
                activityRank.rank += 1;
                activityRank.exp += - activityRank.totalExpToNextRank;
                activityRank.totalExpToNextRank = (1 + ((activityRank.rank-1) * 0.5)) * this.BASE_TICK_RANK;
            }
        }
    }
}