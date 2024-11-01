import GameController from "./GameController";
import { ActivitiesEnum } from "./activities/ActivitiesEnum";
import { CultivateQi } from "./activities/CultivateQi";
import { OddJobs } from "./activities/OddJobs";
import { PhysicalTraining } from "./activities/PhysicalTraining";

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
    
        if (charRef.getUnlockStatus('qi-cultivation')) {
            this.activitiesList.push(new CultivateQi(charRef));
        }
            
        this.activitiesList.push(new PhysicalTraining(charRef));
        this.activitiesList.push(new OddJobs(charRef));
          
    }
    
    doActivityTick() {
        this.activitiesList.find((act) => act.id == this.selectedActivity)?.action.call(this);
    }
    
    doClickActivity(actId: ActivitiesEnum) {
        this.selectedActivity = actId;
    }

}