
import { ActivitiesController } from "../data/activities/ActivitiesController";
import { ExplorationController } from "../data/exploration/ExplorationController";
import GameController from "../data/GameController";
import { MainContentEnum } from "../data/MainContentEnum";
import { MessageController } from "../data/messages/MessageController";
import { ButtonNavigation } from "./Button";

import { MainContentPanel } from "./panels/MainContentPanel";
import { ModalPanel } from "./ModalPanel";
import CalendarPanel from "./panels/CalendarPanel";
import LeftPanelCharacter from "./panels/LeftPanelCharacter";
import MessagesPanel from "./panels/MessagesPanel";

export function GameState(gameController: GameController) {

    function getNavigationOption(label: string, content: MainContentEnum) {
        const getIsSelectedContent = gameController.selectedContent == content;
        return ButtonNavigation(label, gameController.selectContent.bind(gameController, content), getIsSelectedContent)
        
    }

    const doing = !ExplorationController.selectedZone ?
        ActivitiesController.getSelectedActivityTitle()
        : ExplorationController.getSelectedExplorableZoneTitle()

    return (
        <div className="container">
            {ModalPanel(gameController)}
            <div id="row-0" className="row">
                <div className="col-2">
                
                    <div className="panel-left">
                        {CalendarPanel(gameController)}
                        <div style={{ margin: '5px 0px' }}>
                            <label>Doing: {doing}</label>
                        </div>
                        {LeftPanelCharacter()}
                    </div>
        
                </div>
                
                <div className="panel-middle col-8">
                
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

                <div className="panel-right col-2">
                    {MessagesPanel(MessageController.getLast10Messages())}
                </div>

            </div>
        
        </div>
    );
    
}