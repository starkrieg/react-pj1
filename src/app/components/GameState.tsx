
import { useEffect } from "react";

import GameController from "../data/GameController";
import Button from "./Button";
import ModalScreen from "./ModalScreen";
import ActivitiesPanel from "./panels/ActivitiesPanel";
import CalendarPanel from "./panels/CalendarPanel";
import CharacterPanel from "./panels/CharacterPanel";
import MessagesPanel from "./panels/MessagesPanel";
import SettingsPanel from "./panels/SettingsPanel";

function ActivityContent(gameController: GameController, contentId = 'Character') {
    switch(contentId) {
        case 'Character':
            return CharacterPanel(gameController.characterController, gameController.character);
        case 'Activities':
            return ActivitiesPanel(gameController.activitiesController);
        case 'Settings':
            return SettingsPanel(gameController.resetEverything.bind(gameController));
        default:
            return (
                <div>
                    <p>Something went wrong. Please report this.</p>
                </div>
            );
    }
}

function getModal(gameController: GameController) {
    if (gameController.modalType == '') {
        return '';
    } else {
        let modalFunction = gameController.doCloseModal;

        if (['death', 'death-first'].includes(gameController.modalType)) {
            modalFunction = gameController.doAfterDeathModalClick;
        }

        return ModalScreen(gameController.modalController.getModalContentFromType(gameController.modalType), 
            modalFunction.bind(gameController));
    }
}

export function GameState(gameController: GameController) {

    return (
        <div className="container">
            {getModal(gameController)}
            <div id="row-0" className="row">
                <div className="col-3">
                
                    <div className="panel">
                        <div style={{ display: 'flex', gap: 10 }}>
                        { Button('Pause', '', {}, gameController.pauseGame.bind(gameController)) }
                        { Button('1x', '', {}, gameController.unpauseGame.bind(gameController)) }
                        { Button('2x', '', {}, gameController.speedUp2Game.bind(gameController)) }
                        { Button('5x', '', {}, gameController.speedUp5Game.bind(gameController)) }
                        { Button('10x', '', {}, gameController.speedUp10Game.bind(gameController)) }
                        { Button('100x', '', {}, gameController.speedUp100Game.bind(gameController)) }
                        </div>
            
                        {CalendarPanel(gameController.calendar, gameController.character, 
                        gameController.activitiesController.getSelectedActivityTitle())}
                    </div>
        
                </div>
                
                <div className="panel col-6">
                
                    <div style={{ display: 'flex', gap: 10,
                        borderBottomColor: 'black',
                        borderBottomStyle: 'solid',
                        borderBottomWidth: 1,
                        marginBottom: 15
                        }}>
                        { Button('Character', '', {}, gameController.selectContent.bind(gameController, 'Character')) }
                        { Button('Activities', '', {}, gameController.selectContent.bind(gameController, 'Activities')) }
                        { Button('Settings', '', {}, gameController.selectContent.bind(gameController, 'Settings')) }
                    </div>
            
                    {ActivityContent(gameController, gameController.selectedContent)}
                
                </div>

                <div className="panel col-3">
                    {MessagesPanel(gameController.messageController.getLast10Message())}              
                </div>
            </div>
        
        </div>
    );
    
}