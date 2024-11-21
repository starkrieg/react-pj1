import GameController from "../GameController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ActivitiesEnum } from "./ActivitiesEnum";
import { CultivateQi } from "./CultivateQi";
import { OddJobs } from "./OddJobs";
import { PhysicalTraining } from "./PhysicalTraining";

export class ActivitiesController {

    gameController: GameController;
    selectedActivity: ActivitiesEnum;
    activitiesList: any[];

    constructor(gameController: GameController) {
        this.gameController = gameController;
        this.selectedActivity = ActivitiesEnum.NOTHING;
        this.activitiesList = [];
        this.setupActivityList();
    }

    reset() {
        this.selectedActivity = ActivitiesEnum.NOTHING;
        this.setupActivityList();
    }
    
    getSelectedActivityTitle() {
        const title = this.activitiesList.find((act) => act.id == this.selectedActivity)?.title
        return title || 'Nothing';
    }
    
    setupActivityList() {
        const charRef = this.gameController.character;
        this.activitiesList = []
    
        if (charRef.isHaveItem(ItemIdEnum.QI_CULTIVATION_KNOWLEDGE)) {
            this.activitiesList.push(new CultivateQi(charRef));
        }
            
        this.activitiesList.push(new PhysicalTraining(charRef));
        this.activitiesList.push(new OddJobs(charRef));
    }
    
    doActivityTick() {
        this.activitiesList.find((act) => act.id == this.selectedActivity)?.action();
    }
    
    doClickActivity(actId: ActivitiesEnum) {
        this.selectedActivity = actId;
    }

}