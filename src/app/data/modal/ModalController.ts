import { MessageController } from "../messages/MessageController";
import { ErrorController } from "../utils/ErrorController";
import { ModalContent } from "./ModalContent";
import { ModalTypeEnum } from "./ModalTypeEnum";

export class ModalController {

    private static modalContentMap = new Map<ModalTypeEnum, ModalContent>();

    /**
     * Resets all data
     * Used on game hard reset
     */
    static hardReset() {
        this.modalContentMap.clear();
    }

    static getModalContentFromType(modalType: ModalTypeEnum) {
        if (this.modalContentMap.get(modalType)) {
            return this.modalContentMap.get(modalType);
        }

        let title = '';
        let desc = '';
        let buttonText = '';

        switch (modalType) {
            case ModalTypeEnum.GAME_START:
                title = 'A thunderous night!';
                desc = `
                The sky shone bright at night. 
                A golden lightning fell and blasted your consciousness away. 
                You woke up the next morning alive, unhurt, but with a new feeling on your chest. 
                You realized how small you are, and this feeling birthed a call for power. 
                A call for immortality.
                `;
                buttonText = 'Move forward';
                break;
            case ModalTypeEnum.DEATH_FIRST:
                title = 'You died!';
                desc = `
                Your life essence fades away as you perish.
                As the darkness consumes your vision, a spark of golden light flashes in your view.
                `;
                buttonText = 'Move forward';
                break;
            case ModalTypeEnum.DEATH:
                title = 'You died!';
                desc = `
                You perish, and then a spark of golden light fills your view.
                `;
                buttonText = 'Move forward';
                break;
            default:
                title = 'Something went wrong!';
                desc = 'Please report this';
                buttonText = 'Close';
                ErrorController.throwSomethingWrongError();
                break;
        }

        const content = new ModalContent(title, desc, buttonText);

        // first time modal content is created for use, print the content to message controller too
        // message should appear on controller only once
        MessageController.pushMessageStory(content.title + ' ' + content.desc);

        this.modalContentMap.set(modalType, content);
        return this.modalContentMap.get(modalType);
    }    

}