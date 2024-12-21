import GameController from "../../data/GameController";
import { MainContentEnum } from "../../data/MainContentEnum";
import { ExplorationController } from "../../data/exploration/ExplorationController";
import { MessageController } from "../../data/messages/MessageController";
import ActivitiesPanel from "./ActivitiesPanel";
import CharacterPanel from "./CharacterPanel";
import ExplorableZoneProgressPanel from "./ExplorableZoneProgressPanel";
import ExplorableZonesPanel from "./ExplorableZonesPanel";
import MessagesPanel from "./MessagesPanel";
import SettingsPanel from "./SettingsPanel";

export function MainContentPanel(gameController: GameController, contentId = MainContentEnum.CHARACTER) {
    switch(contentId) {
        case MainContentEnum.CHARACTER:
            return CharacterPanel();
        case MainContentEnum.ACTIVITIES:
            return ActivitiesPanel();
        case MainContentEnum.SETTINGS:
            return SettingsPanel(gameController.resetEverything.bind(gameController));
        case MainContentEnum.JOURNAL:
            return MessagesPanel(MessageController.getJournalMessages())
        case MainContentEnum.EXPLORE:
            if (ExplorationController.selectedZone) {
                return ExplorableZoneProgressPanel();
            } else {
                return ExplorableZonesPanel();
            }
        default:
            return (
                <div>
                    <p>Something went wrong. Please report this.</p>
                </div>
            );
    }
}