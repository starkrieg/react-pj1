import { ErrorController } from "../utils/ErrorController";
import { ActivityEnum } from "./ActivityEnum";
import { IActivity } from "./IActivity";
import { ActivityRank } from "./ActivityRank";
import ActivityPool from "./ActivityPool";
import { CharacterController } from "../character/CharacterController";
import { MarketController } from "../market/MarketController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";

export class ActivitiesController {

    // base days for rank up
    private static readonly BASE_DAYS_RANK_UP = 24;
    // rate which days for rank up grow
    private static readonly RANK_UP_GROWTH_RATE = 0.70;

    static selectedActivity: IActivity | undefined = undefined;

    private static unlockedActivities: IActivity[] = [];

    private static activityRankMap: Map<ActivityEnum, ActivityRank> = new Map<ActivityEnum, ActivityRank>();

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
    
    static doSelectActivity(act: IActivity) {
        this.selectedActivity = act;
    }

    /**
     * Add activty to the list
     * @param activity activity object
     */
    static addActivity(activity: IActivity) {
        if (!activity) {
            ErrorController.throwSomethingWrongError();
        }

        this.unlockedActivities.push(activity);
        this.updateUnlockedActivities();
        
        //only add to map if not there yet
        //so that map is not reset when creating activities after death
        if (!this.activityRankMap.has(activity.id)) {
            this.activityRankMap.set(activity.id, new ActivityRank(0, 0, this.BASE_DAYS_RANK_UP));
        }
    }

    private static updateUnlockedActivities() {
        const marketActivities = [ActivityEnum.PERFORM_ODD_JOBS]
        //order unlocked list
        const allActivities = ActivityPool.getActivityPool()
        this.unlockedActivities = allActivities.filter(
            act => {
                const isUnlocked = this.unlockedActivities.includes(act)
                if (marketActivities.includes(act.id)) {
                    return isUnlocked && MarketController.isAnyMarketReagionAvailable();
                }
                return isUnlocked;
            }
        )

        if (this.selectedActivity && !this.unlockedActivities.includes(this.selectedActivity)) {
            this.selectedActivity = undefined;
        }
    }

    static updateActivities() {
        this.updateUnlockedActivities();
    }

    static getActivitiesList() : Readonly<IActivity[]> {
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
            return 0;
        }
    }

    // every rank up increase total exp for next rank by 50%
    // increment exp by default 1
    static incrementExpActivity(id: ActivityEnum) {
        const baseValue = 1;
        const talentMultiplier = CharacterController.getCharacter().getAttributeValue(AttributeTypeEnum.TALENT)
        const meditateMultiplier = 1 + (this.getActivityRank(ActivityEnum.MEDITATE) / 100)
        const activityRank = this.activityRankMap.get(id);

        if (activityRank) {
            //more exp means increased activity speed
            if (id == ActivityEnum.MEDITATE) {
                //for meditate rank 100
                const confucianIMod = CharacterController.isHaveItem(ItemIdEnum.BOOK_CONFUCIAN_SCRIPTURES_I) 
                    ? 2 : 1;

                //for meditate rank 200
                const mysticIncenseMod = CharacterController.isHaveItem(ItemIdEnum.ITEM_MYSTIC_INCENSE) 
                    ? 2 : 1;

                //for meditate rank 300
                const taoistIMod = CharacterController.isHaveItem(ItemIdEnum.BOOK_TAOIST_SCRIPTURES_I) 
                    ? 2 : 1;

                const meditateItemMods = confucianIMod * mysticIncenseMod * taoistIMod;
                activityRank.exp += (baseValue * talentMultiplier * meditateMultiplier * meditateItemMods);
            } else {
                activityRank.exp += (baseValue * talentMultiplier * meditateMultiplier);
            }
            
            while (activityRank.exp >= activityRank.totalExpToNextRank) {
                activityRank.rank += 1;
                activityRank.exp += - activityRank.totalExpToNextRank;
                activityRank.totalExpToNextRank = (1 + ((activityRank.rank-1) * this.RANK_UP_GROWTH_RATE)) * this.BASE_DAYS_RANK_UP;
                CharacterController.updateAttributesFromActivity(id);
            }
        }
    }

    static exportSaveData() : Record<string, unknown> {
        return {
            // export only the id of the activity
            selectedActivity: this.selectedActivity?.id,
            // export only the array of id of the activities
            unlockedActivities: this.unlockedActivities.map(act => act.id),
            // activity enum is unchanged
            // activity rank will become a simple object
            activityRankMap: this.activityRankMap.entries().toArray()
        }
    }

    static importSaveData(dataObject: Partial<Record<string, unknown>>) {
        //empty object is not processed
        if (!dataObject) {
            return;
        }

        
        this.selectedActivity = ActivityPool.getActivityPool()
            .find(act => act.id == (dataObject['selectedActivity'] as ActivityEnum));

        this.unlockedActivities = ActivityPool.getActivityPool()
            .filter(act => (dataObject['unlockedActivities'] as ActivityEnum[]).includes(act.id));
        
        this.activityRankMap.clear();
        (dataObject['activityRankMap'] as Array<[ActivityEnum, Record<string, any>]>)
            .forEach(([key, value]) => {
                //translate data to <ActivityEnum, ActivityRank>
                const actRankObj = ActivityRank.createFromData(value);
                this.activityRankMap.set(key, actRankObj)
            });
    }
}
