import CentralController from "./central_controller";

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
    
    /*
    single message expected format:
    {
        characterY: character.year,
        characterM: character.month
        message: message
    }
    */
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
            </button>
        });

        // add later: <progress max={10} value={5}/>

        return <div style={{ display: 'grid' }}>
                {preparedList}
            </div>;
    }

    setupActivityList() {
        this.activitiesList = [
            {
                id: 'odd-jobs',
                title: 'Odd jobs',
                desc: 'Perform odd jobs to receive money. Pays almost nothing, but increases with your Body. Gain money per tick.',
                action: () => {
                  this.centralController.character.money += Math.floor(1 + (1 * (this.centralController.character.body/100)));
                }
            },
            {
                id: 'phy-train',
                title: 'Physical training',
                desc: 'Gain body',
                action: () => {
                    this.centralController.character.body += 1;
                }
            },
            {
                id: 'cult-qi',
                title: 'Cultivate Qi',
                desc: 'Gain qi',
                action: () => {
                    this.centralController.character.qi += 1;
                }
            },
            {
                id: 'expl',
                title: 'Explore',
                desc: 'Chance to multiple gains',
                action: () => {
                  /*
                    Chances for different results
                    0-1: big qi
                    2-3: big body
                    4-5: big money
                    6: small qi and small body
                    7-8-9: nothing
                  */
                  const randomValue = Math.floor(Math.random() * 10)
                  switch(randomValue) {
                    case 0:
                    case 1:
                        this.centralController.character.qi += 3;
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'Found some medicinal herb! Increased Qi by a small amount!');
                        break;
                    case 2:
                    case 3:
                        this.centralController.character.body += 3
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'All that searching is giving you results! Increased Body by a small amount!');
                        break;
                    case 4:
                    case 5:
                        this.centralController.character.money += 3
                        this.centralController.messagesPanel.pushToMessageBoard(
                            this.centralController.character.year, 
                            this.centralController.character.month, 
                            'Found some stuff around to sell! Increased Money by a small amount!');
                        break;
                    case 6:
                        this.centralController.character.qi += 1;
                        this.centralController.character.body += 1;
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
            }
          ];
    }
}

