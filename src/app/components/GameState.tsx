
import { ActivitiesController } from "../data/activities/ActivitiesController";
import { ExplorationController } from "../data/exploration/ExplorationController";
import GameController from "../data/GameController";
import { MainContentEnum } from "../data/MainContentEnum";
import { ButtonNavigation } from "./Button";

import { MainContentPanel } from "./panels/MainContentPanel";
import { ModalPanel } from "./ModalPanel";
import CalendarPanel from "./panels/CalendarPanel";
import LeftPanelCharacter from "./panels/LeftPanelCharacter";
import MessagesPanel from "./panels/MessagesPanel";
import { CharacterController } from "../data/character/CharacterController";
import { ItemIdEnum } from "../data/items/ItemIdEnum";
import { Tooltip } from "./Tooltip";
import SettingsPanel from "./panels/SettingsPanel";

export function GameState(gameController: GameController) {

    function getNavigationOption(label: string, content: MainContentEnum) {
        const getIsSelectedContent = gameController.selectedContent == content;
        return ButtonNavigation(label, gameController.selectContent.bind(gameController, content), getIsSelectedContent)
        
    }

    const doing = !ExplorationController.selectedZone ?
        ActivitiesController.getSelectedActivityTitle()
        : ExplorationController.getSelectedExplorableZoneTitle()

    const cultivationUnlocked = CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION);

    return (
        <div>
            <div className="container">
                { Tooltip() }
                { ModalPanel(gameController) }
                <div id="row-0" className="row game-content-div">
                    
                    <div className="col-2 panel-left">
                        
                        {CalendarPanel(gameController)}
                        
                        <div style={{ margin: '5px 0px' }} >
                            <label>
                                Doing: {doing}
                            </label>
                        </div>
                        
                        {LeftPanelCharacter()}

                    </div>        
                    
                    <div className="panel-middle col-7">
                    
                        <div className="navigation-div">
                            { cultivationUnlocked && getNavigationOption('Cultivation', MainContentEnum.CULTIVATION) }
                            { getNavigationOption('Activities',  MainContentEnum.ACTIVITIES) }
                            { getNavigationOption('Market', MainContentEnum.MARKET) }
                            { getNavigationOption('Explore', MainContentEnum.EXPLORE) }
                            { getNavigationOption('Journal', MainContentEnum.JOURNAL) }
                        </div>
                
                        {MainContentPanel(gameController.selectedContent)}
                    
                    </div>

                    {MessagesPanel()}

                </div>
            </div>
            <div className="footer-div">
                { SettingsPanel() }
            </div>
        </div>
    );
    
}