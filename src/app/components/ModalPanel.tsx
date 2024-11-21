import GameController from "../data/GameController";
import { ModalTypeEnum } from "../data/modal/ModalTypeEnum";
import ModalScreen from "./ModalScreen";

export function ModalPanel(gameController: GameController) {
    if (gameController.modalType == ModalTypeEnum.NOTHING) {
        return '';
    } else {
        let modalFunction = gameController.doCloseModal;

        if ([ModalTypeEnum.DEATH, ModalTypeEnum.DEATH_FIRST].includes(gameController.modalType)) {
            modalFunction = gameController.doAfterDeathModalClick;
        }

        return ModalScreen(gameController.modalController.getModalContentFromType(gameController.modalType), 
            modalFunction.bind(gameController));
    }
}