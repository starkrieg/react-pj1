import { ActivitiesController } from "./ActivitiesController";
import { OddJobs } from "./OddJobs";
import { PhysicalTraining } from "./PhysicalTraining";

export default class ActivityCreator {

    static createActivities() {
        ActivitiesController.createActivity(new PhysicalTraining());
        ActivitiesController.createActivity(new OddJobs());
    }

}