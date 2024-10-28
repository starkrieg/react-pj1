import CentralController from "../data/CentralController";
import Button from "./Button";
import ModalScreen from "./ModalScreen";
import ActivitiesPanel from "./panels/ActivitiesPanel";
import CalendarPanel from "./panels/CalendarPanel";
import CharacterPanel from "./panels/CharacterPanel";
import MessagesPanel from "./panels/MessagesPanel";
import SettingsPanel from "./panels/SettingsPanel";

function ActivityContent(centralController: CentralController, contentId = 'Character') {
    switch(contentId) {
        case 'Character':
            return CharacterPanel(centralController.characterController, centralController.character);
        case 'Activities':
            return ActivitiesPanel(centralController.activitiesController);
        case 'Settings':
            return SettingsPanel(centralController.resetEverything.bind(centralController));
        default:
            return (
                <div>
                    <p>Something went wrong. Please report this.</p>
                </div>
            );
    }
}

function getModal(centralController: CentralController) {
    if (centralController.modalType == '') {
        return '';
    } else {
        let modalFunction = centralController.doCloseModal;

        if (['death', 'death-first'].includes(centralController.modalType)) {
            modalFunction = centralController.doAfterDeathModalClick;
        }

        return ModalScreen(centralController.modalController.getModalContentFromType(centralController.modalType), 
            modalFunction.bind(centralController));
    }
}

export function GameState(centralController: CentralController) {

    return (
        <div className="container">
        {getModal(centralController)}
        <div id="row-0" className="row">
            <div className="col-3">
            
            <div className="panel">
                <div style={{ display: 'flex', gap: 10 }}>
                { Button('Pause', '', {}, centralController.pauseGame.bind(centralController)) }
                { Button('1x', '', {}, centralController.unpauseGame.bind(centralController)) }
                { Button('2x', '', {}, centralController.speedUp2Game.bind(centralController)) }
                { Button('5x', '', {}, centralController.speedUp5Game.bind(centralController)) }
                { Button('10x', '', {}, centralController.speedUp10Game.bind(centralController)) }
                { Button('100x', '', {}, centralController.speedUp100Game.bind(centralController)) }
                </div>
    
                {CalendarPanel(centralController.calendar, centralController.character, 
                centralController.activitiesController.getSelectedActivityTitle())}
            </div>
    
            </div>
            
            <div className="panel col-6">
            
                <div style={{ display: 'flex', gap: 10,
                    borderBottomColor: 'black',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: 1,
                    marginBottom: 15
                    }}>
                    { Button('Character', '', {}, centralController.selectContent.bind(centralController, 'Character')) }
                    { Button('Activities', '', {}, centralController.selectContent.bind(centralController, 'Activities')) }
                    { Button('Settings', '', {}, centralController.selectContent.bind(centralController, 'Settings')) }
                </div>
        
                {ActivityContent(centralController, centralController.selectedContent)}
            
            </div>

            <div className="panel col-3">
                {MessagesPanel(centralController.messageController.getLast10Message())}              
            </div>
        </div>
        
        </div>
    );
    
}