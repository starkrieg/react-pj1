import GameController from "../data/GameController";
import { MainContentEnum } from "../data/MainContentEnum";
import { ExploreZoneEnum } from "../data/exploration/ExploreZoneEnum";
import ActivitiesPanel from "./panels/ActivitiesPanel";
import CharacterPanel from "./panels/CharacterPanel";
import ExplorableZoneProgressPanel from "./panels/ExplorableZoneProgressPanel";
import ExplorableZonesPanel from "./panels/ExplorableZonesPanel";
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
            return MessagesPanel(gameController.messageController.getJournalMessages())
        case MainContentEnum.EXPLORE:
            if (gameController.explorationController.selectedZone != ExploreZoneEnum.NOTHING) {
                return ExplorableZoneProgressPanel(gameController.explorationController);
            } else {
                return ExplorableZonesPanel(gameController.explorationController);
            }
        default:
            return (
                <div>
                    <p>Something went wrong. Please report this.</p>
                </div>
            );
    }
}