import GameController from "../data/GameController";
import { ModalController } from "../data/modal/ModalController";
import { ModalTypeEnum } from "../data/modal/ModalTypeEnum";
import ModalScreen from "./ModalScreen";

export function ModalPanel(gameController: GameController) {
    const currentModal = ModalController.getCurrentModal();
    if (currentModal == ModalTypeEnum.NOTHING) {
        return '';
    } else {
        let modalFunction = ModalController.clearModal;

        if ([ModalTypeEnum.DEATH, ModalTypeEnum.DEATH_FIRST].includes(currentModal)) {
            modalFunction = gameController.doAfterDeathModalClick;
        }

        return ModalScreen(ModalController.getModalContentFromType(currentModal), 
            modalFunction.bind(ModalController));
    }
}