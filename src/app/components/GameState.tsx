
import GameController from "../data/GameController";
import { MainContentEnum } from "../data/MainContentEnum";
import { MessageController } from "../data/messages/MessageController";
import Button, { ButtonNavigation } from "./Button";

import { MainContentPanel } from "./MainContentPanel";
import { ModalPanel } from "./ModalPanel";
import CalendarPanel from "./panels/CalendarPanel";
import MessagesPanel from "./panels/MessagesPanel";

export function GameState(gameController: GameController) {

    function getNavigationOption(label: string, content: MainContentEnum) {
        const getIsSelectedContent = gameController.selectedContent == content;
        return ButtonNavigation(label, gameController.selectContent.bind(gameController, content), getIsSelectedContent)
        
    }

    return (
        <div className="container">
            {ModalPanel(gameController)}
            <div id="row-0" className="row">
                <div className="col-3">
                
                    <div className="panel">
                        <div style={{ display: 'flex', gap: 10 }}>
                        { Button('Pause', gameController.pauseGame.bind(gameController)) }
                        { Button('1x', gameController.unpauseGame.bind(gameController)) }
                        { Button('2x', gameController.speedUp2Game.bind(gameController)) }
                        { Button('5x', gameController.speedUp5Game.bind(gameController)) }
                        { Button('10x', gameController.speedUp10Game.bind(gameController)) }
                        { Button('100x', gameController.speedUp100Game.bind(gameController)) }
                        </div>
            
                        {CalendarPanel(gameController.calendar)}
                    </div>
        
                </div>
                
                <div className="panel col-6">
                
                    <div className="navigation-div" 
                        >
                        { getNavigationOption('Character', MainContentEnum.CHARACTER) }
                        { getNavigationOption('Activities',  MainContentEnum.ACTIVITIES) }
                        { getNavigationOption('Explore', MainContentEnum.EXPLORE) }
                        { getNavigationOption('Journal', MainContentEnum.JOURNAL) }
                        { getNavigationOption('Settings', MainContentEnum.SETTINGS) }
                    </div>
            
                    {MainContentPanel(gameController, gameController.selectedContent)}
                
                </div>

                <div className="panel col-3">
                    {MessagesPanel(MessageController.getLast10Messages())}
                </div>

            </div>
        
        </div>
    );
    
}