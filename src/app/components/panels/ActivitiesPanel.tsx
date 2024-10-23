'use client'

import { CultivateQi } from "@/app/data/activities/CultivateQi";
import { ButtonActivity } from "../Button";
import CentralController from "../CentralController";
import { PhysicalTraining } from "@/app/data/activities/PhysicalTraining";
import { OddJobs } from "@/app/data/activities/OddJobs";

export default class ActivitiesPanel {

    selectedActivity: string;
    activitiesList: any[];
    centralController: CentralController;

    constructor(centralController: CentralController) {
        this.selectedActivity = '';
        this.activitiesList = [];
        this.centralController = centralController;
        this.setupActivityList();
    }

    public reset() {
        this.selectedActivity = '';
        this.setupActivityList();
    }

    public getSelectedActivityTitle() {
        const title = this.activitiesList.find((act) => act.id == this.selectedActivity)?.title
        return title || 'Nothing';
    }

    public doActivityTick() {
        this.activitiesList.find((act) => act.id == this.selectedActivity)?.action.call(this);
    }

    private doClickActivity(actId: string) {
        this.selectedActivity = actId;
    }
    
    private roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    createActivitiesPanel() {

        const preparedList = this.activitiesList.map(act => {
            const rankGainText = 'Rank ' 
                + act.rank 
                + ' / ' 
                + this.roundTo2Decimal(act.getTickGain()) 
                + ' per day';

            return ButtonActivity(
                act.id,
                act.title,
                act.desc,
                rankGainText,
                act.totalExpToNextRank,
                act.exp,
                '',
                {
                    borderWidth: 1,
                    borderColor: 'black',
                    borderStyle: 'dashed',
                    marginBottom: 5
                },
                this.doClickActivity.bind(this, act.id)
                );
            });

        return <div style={{ display: 'grid' }}>
                {preparedList}
            </div>;
    }

    setupActivityList() {
        const charRef = this.centralController.character;
        this.activitiesList = []

        if (this.centralController.character.getUnlockStatus('qi-cultivation')) {
            this.activitiesList.push(new CultivateQi(charRef));
        }
            
        this.activitiesList.push(new PhysicalTraining(charRef));
        this.activitiesList.push(new OddJobs(charRef));
          
    }
}

