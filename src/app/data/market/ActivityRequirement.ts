import { ActivitiesController } from "../activities/ActivitiesController";
import { ActivityEnum } from "../activities/ActivityEnum";
import { RequirementInterface } from "./RequirementInterface";

export class ActivityRequirement implements RequirementInterface {

    id: ActivityEnum;
    rank: number;

    constructor(id: ActivityEnum, rank: number) {
        this.id = id;
        this.rank = rank;
    }

    isRequirementMet() {
        return ActivitiesController.getActivityRank(this.id) >= this.rank;
    }

}