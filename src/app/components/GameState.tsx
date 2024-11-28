
import GameController from "../data/GameController";
import { MainContentEnum } from "../data/MainContentEnum";
import { MessageController } from "../data/messages/MessageController";
import Button from "./Button";
import { MainContentPanel } from "./MainContentPanel";
import { ModalPanel } from "./ModalPanel";
import CalendarPanel from "./panels/CalendarPanel";
import MessagesPanel from "./panels/MessagesPanel";

export function GameState(gameController: GameController) {

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
                
                    <div style={{ display: 'flex', gap: 10,
                        borderBottomColor: 'black',
                        borderBottomStyle: 'solid',
                        borderBottomWidth: 1,
                        marginBottom: 15
                        }}>
                        { Button('Character', gameController.selectContent.bind(gameController, MainContentEnum.CHARACTER)) }
                        { Button('Activities', gameController.selectContent.bind(gameController, MainContentEnum.ACTIVITIES)) }
                        { Button('Explore', gameController.selectContent.bind(gameController, MainContentEnum.EXPLORE)) }
                        { Button('Journal', gameController.selectContent.bind(gameController, MainContentEnum.JOURNAL)) }
                        { Button('Settings', gameController.selectContent.bind(gameController, MainContentEnum.SETTINGS)) }
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