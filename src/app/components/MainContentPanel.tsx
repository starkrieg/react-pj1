import GameController from "../data/GameController";
import { MainContentEnum } from "../data/MainContentEnum";
import ActivitiesPanel from "./panels/ActivitiesPanel";
import CharacterPanel from "./panels/CharacterPanel";
import MessagesPanel from "./panels/MessagesPanel";
import SettingsPanel from "./panels/SettingsPanel";

export function MainContentPanel(gameController: GameController, contentId = MainContentEnum.CHARACTER) {
    switch(contentId) {
        case MainContentEnum.CHARACTER:
            return CharacterPanel(gameController.characterController, gameController.character);
        case MainContentEnum.ACTIVITIES:
            return ActivitiesPanel(gameController.activitiesController);
        case MainContentEnum.SETTINGS:
            return SettingsPanel(gameController.resetEverything.bind(gameController));
        case MainContentEnum.JOURNAL:
        return MessagesPanel(gameController.messageController.getLast10Message())
        default:
            return (
                <div>
                    <p>Something went wrong. Please report this.</p>
                </div>
            );
    }
}