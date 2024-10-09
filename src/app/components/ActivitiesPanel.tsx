import { Activity } from "./activities/Activity";
import { CultivateQi } from "./activities/CultivateQi";
import { OddJobs } from "./activities/OddJobs";
import { PhysicalTraining } from "./activities/PhysicalTraining";
import CentralController from "./CentralController";

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
    
    private roundTo1Decimal(value: number) {
        return Math.round(value * 10) / 10;
    }

    createActivitiesPanel() {

        const preparedList = this.activitiesList.map(act => {
            return <button id={act.id} key={act.id} style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderStyle: 'dashed',
                    marginBottom: 5
                }}
                onClick={this.doClickActivity.bind(this, act.id)}>
                <p>{act.title}</p>
                {act.desc}
                <p>Rank {act.rank} / {this.roundTo1Decimal(act.getTickGain())} per tick</p>
                <progress style={{ width: '100%' }} max={act.totalExpToNextRank} value={act.exp}/>
                </button>
            });

        return <div style={{ display: 'grid' }}>
                {preparedList}
            </div>;
    }

    setupActivityList() {
        const charRef = this.centralController.character;
        this.activitiesList = [
            new OddJobs(charRef),
            new PhysicalTraining(charRef),
            new CultivateQi(charRef)
          ];
    }
}

