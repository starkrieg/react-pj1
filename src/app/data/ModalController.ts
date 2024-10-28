
import CentralController from "./CentralController";
import { ModalContent } from "./ModalContent";

export class ModalController {

    centralController: CentralController;
    modalContentMatrix = new Map<string, ModalContent>();
    
    constructor(centralController: CentralController) {
        this.centralController = centralController
    }

    reset() {
        this.modalContentMatrix.clear();
    }

    getModalContentFromType(modalType: string) {
        if (this.modalContentMatrix.get(modalType)) {
            return this.modalContentMatrix.get(modalType);
        }

        let title = '';
        let desc = '';
        let buttonText = '';

        switch (modalType) {
            case 'game-start':
                title = 'A thunderous night!';
                desc = `
                The sky shone bright at night. 
                A golden lightning downed on you, 
                the sudden shock taking your consciousness away. 
                You woke up the next morning alive, unhurt, but with a new feeling on your chest. 
                And along that came the sudden realization of how small you are.
                A calling was birthed in you. A call for power. A call for imortality.
                `;
                buttonText = 'Move forward';
                break;
            case 'death-first':
                title = 'You died!';
                desc = `
                The last strands of lifeforce leave your existence as you perish.
                As the darkness consumes your vision, a bolt of golden light flashes in your view.
                When you open your eyes, you are alive and young again.
                You are weak, but all you went through will push you to even higher heights.
                `;
                buttonText = 'Move forward';
                break;
            case 'death':
                title = 'You died!';
                desc = `
                You perish, and then a spark of golden fills your view.
                You open your eyes, alive and young again.
                You are weak, but ready to go even further this time.
                `;
                buttonText = 'Move forward';
                break;
            default:
                title = 'Something went wrong!';
                desc = 'Please report this';
                buttonText = 'Close';
                break;
        }

        const content = new ModalContent(title, desc, buttonText);

        // first time modal content is created for use, print the content to message controller too
        // message should appear on controller only once
        this.centralController.messageController.pushMessage(this.centralController.character.year, 
            this.centralController.character.day, content.title + ' ' + content.desc);    

        this.modalContentMatrix.set(modalType, content);
        return this.modalContentMatrix.get(modalType);
    }    

}