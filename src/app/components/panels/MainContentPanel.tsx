import GameController from "../../data/GameController";
import { MainContentEnum } from "../../data/MainContentEnum";
import { ExplorationController } from "../../data/exploration/ExplorationController";
import { MessageController } from "../../data/messages/MessageController";
import ActivitiesPanel from "./ActivitiesPanel";
import CultivationPanel from "./CultivationPanel";
import ExplorableZoneProgressPanel from "./ExplorableZoneProgressPanel";
import ExplorableZonesPanel from "./ExplorableZonesPanel";
import JournalPanel from "./JournalPanel";
import { MarketPanel } from "./MarketPanel";
import SettingsPanel from "./SettingsPanel";

export function MainContentPanel(gameController: GameController, contentId = MainContentEnum.ACTIVITIES) {
    switch(contentId) {
        case MainContentEnum.CULTIVATION:
            return CultivationPanel();
        case MainContentEnum.ACTIVITIES:
            return ActivitiesPanel();
        case MainContentEnum.MARKET:
                return MarketPanel();
        case MainContentEnum.EXPLORE:
            if (ExplorationController.selectedZone) {
                return ExplorableZoneProgressPanel();
            } else {
                return ExplorableZonesPanel();
            }
        case MainContentEnum.JOURNAL:
            return JournalPanel(MessageController.getJournalMessages())
        case MainContentEnum.SETTINGS:
            return SettingsPanel(gameController.resetEverything.bind(gameController));
    
        default:
            return (
                <div>
                    <p>Something went wrong. Please report this.</p>
                </div>
            );
    }
}