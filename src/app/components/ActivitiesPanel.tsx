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
            new OddJobs(
                'odd-jobs',
                'Odd jobs',
                'Perform odd jobs to receive some coins. Increases with your body.',
                charRef
            ),
            new PhysicalTraining(
                'phy-train',
                'Physical training',
                'Gain body',
                this.centralController.character
            ),
            new CultivateQi(
                'cult-qi',
                'Cultivate Qi',
                'Gain qi',
                this.centralController.character
            ),
            new Activity(
                'expl',
                'Explore',
                'Chance to multiple gains',
                this.centralController.character
                /*
                () => {
                  /*
                    Chances for different results
                    0-1: big qi
                    2-3: big body
                    4-5: big money
                    6: small qi and small body
                    7-8-9: nothing
                  */
                 /*
                  const randomValue = Math.floor(Math.random() * 10)
                  switch(randomValue) {
                    case 0:
                    case 1:
                        this.centralController.character.increaseQi(3);
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'Found some medicinal herb! Increased Qi by a small amount!');
                        break;
                    case 2:
                    case 3:
                        this.centralController.character.increaseBody(3);
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'All that searching is giving you results! Increased Body by a small amount!');
                        break;
                    case 4:
                    case 5:
                        this.centralController.character.increaseMoney(3);
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'Found some stuff around to sell! Increased Money by a small amount!');
                        break;
                    case 6:
                        this.centralController.character.increaseQi(1);
                        this.centralController.character.increaseBody(1);
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'After an exhausting hike you found some herbs! Qi and Body increased by a small amount!');
                        break;
                    case 7:
                    case 6:
                    case 7:
                    default:
                        //nothing
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'You found nothing while exploring!');
                  }
                }
                */
            )
          ];
    }
}

