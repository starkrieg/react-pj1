import { ErrorController } from "../utils/ErrorController";
import { ActivityEnum } from "./ActivityEnum";
import { Activity } from "./Activity";
import { ActivityRank } from "./ActivityRank";
import ActivityPool from "./ActivityPool";

export class ActivitiesController {

    // base days for rank up
    private static BASE_DAYS_RANK_UP = 6;
    // rate which days for rank up grow
    private static RANK_UP_GROWTH_RATE = 0.3;

    static selectedActivity: Activity | undefined = undefined;

    private static unlockedActivities: Activity[] = [];

    private static activityRankMap: Map<ActivityEnum, ActivityRank> = new Map<ActivityEnum, ActivityRank>();
    
    /**
     * Resets all data
     * Used on game hard reset
     */
    static hardReset() {
        this.selectedActivity = undefined;
        this.unlockedActivities = [];
        this.activityRankMap.clear();
    }

    /**
     * Resets superficial data, like selected activity and activities available
     * Used on character death
     */
    static softReset() {
        this.selectedActivity = undefined;
        this.unlockedActivities = [];
    }
    
    static getSelectedActivityTitle() {
        return this.selectedActivity ? this.selectedActivity.title : 'Nothing';
    }
    
    static doActivityTick() {
        this.selectedActivity?.action();
    }
    
    static doSelectActivity(act: Activity) {
        this.selectedActivity = act;
    }

    /**
     * Add activty to the list
     * @param activity activity object
     */
    static addActivity(activity: Activity) {
        if (!activity) {
            ErrorController.throwSomethingWrongError();
        }

        this.unlockedActivities.push(activity);

        //order unlocked list
        const allActivities = ActivityPool.getActivityPool()
        this.unlockedActivities = allActivities.filter(act => this.unlockedActivities.includes(act))
        
        //only add to map if not there yet
        //so that map is not reset when creating activities after death
        if (!this.activityRankMap.has(activity.id)) {
            this.activityRankMap.set(activity.id, new ActivityRank(1, 0, this.BASE_DAYS_RANK_UP));
        }
    }

    static getActivitiesList() : Readonly<Activity[]> {
        return this.unlockedActivities;
    }

    static getActivityRankObj(id: ActivityEnum) : Readonly<ActivityRank> {
        return this.activityRankMap.get(id) || new ActivityRank(-1, 0, 0);
    }

    static getActivityRank(id: ActivityEnum) {
        const activityRank = this.activityRankMap.get(id);
        if (activityRank) {
            return activityRank.rank;
        } else {
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
                activityRank.totalExpToNextRank = (1 + ((activityRank.rank-1) * this.RANK_UP_GROWTH_RATE)) * this.BASE_DAYS_RANK_UP;
            }
        }
    }
}