import CentralController from "../components/CentralController";
import { CultivateQi } from "./activities/CultivateQi";
import { OddJobs } from "./activities/OddJobs";
import { PhysicalTraining } from "./activities/PhysicalTraining";

export default class ActivitiesController {

    centralController: CentralController;
    selectedActivity: string;
    activitiesList: any[];

    constructor(centralController: CentralController) {
        this.centralController = centralController;
        this.selectedActivity = '';
        this.activitiesList = [];
        this.setupActivityList();
    }

    reset() {
        this.selectedActivity = '';
        this.setupActivityList();
    }
    
    getSelectedActivityTitle() {
        const title = this.activitiesList.find((act) => act.id == this.selectedActivity)?.title
        return title || 'Nothing';
    }
    
    setupActivityList() {
        const charRef = this.centralController.character;
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
    
    doClickActivity(actId: string) {
        this.selectedActivity = actId;
    }

}