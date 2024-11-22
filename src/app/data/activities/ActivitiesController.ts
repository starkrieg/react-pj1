import { ErrorController } from "../utils/ErrorController";
import { ActivitiesEnum } from "./ActivitiesEnum";
import { Activity } from "./Activity";

export class ActivitiesController {

    static selectedActivity: ActivitiesEnum = ActivitiesEnum.NOTHING;
    
    private static activitiesList: any[] = [];

    static reset() {
        this.selectedActivity = ActivitiesEnum.NOTHING;
        this.activitiesList = [];
    }
    
    static getSelectedActivityTitle() {
        const title = this.activitiesList.find((act) => act.id == this.selectedActivity)?.title
        return title || 'Nothing';
    }
    
    static doActivityTick() {
        this.activitiesList.find((act) => act.id == this.selectedActivity)?.action();
    }
    
    static doClickActivity(actId: ActivitiesEnum) {
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
    }

    static getActivitiesList() {
        return this.activitiesList;
    }

}