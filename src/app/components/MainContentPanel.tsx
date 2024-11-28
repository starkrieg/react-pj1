import GameController from "../data/GameController";
import { MainContentEnum } from "../data/MainContentEnum";
import { ExplorationController } from "../data/exploration/ExplorationController";
import { ExploreZoneIdEnum } from "../data/exploration/ExploreZoneIdEnum";
import { MessageController } from "../data/messages/MessageController";
import ActivitiesPanel from "./panels/ActivitiesPanel";
import CharacterPanel from "./panels/CharacterPanel";
import ExplorableZoneProgressPanel from "./panels/ExplorableZoneProgressPanel";
import ExplorableZonesPanel from "./panels/ExplorableZonesPanel";
import MessagesPanel from "./panels/MessagesPanel";
import SettingsPanel from "./panels/SettingsPanel";

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
            if (ExplorationController.selectedZoneId != ExploreZoneIdEnum.NOTHING) {
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