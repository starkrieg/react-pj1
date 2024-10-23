'use client'

import Button from "./Button";
import CentralController from "./CentralController";

class ModalContent {

    title: string;
    desc: string;
    buttonText: string;

    constructor(title: string, desc: string, buttonText: string) {
        this.title = title;
        this.desc = desc;
        this.buttonText = buttonText;
    }

}

export default class ModalController {

    centralController: CentralController;
    modalContentMatrix = new Map<string, ModalContent>();
    
    modalType = ''

    constructor(centralController: CentralController) {
        this.centralController = centralController
    }

    reset() {
        this.modalType = '';
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
        this.modalContentMatrix.set(modalType, content);
        return this.modalContentMatrix.get(modalType);
    }

    defaultAlertError() {
        console.log('Something went wrong!');
        alert('Something went wrong! Please report this!');
    }

    createModal(modalType = 'Unknown', modalClickFnc = this.defaultAlertError) {
        const content = this.getModalContentFromType(modalType);

        if (!content) {
            this.defaultAlertError();
            return;
        }

        if (modalType != this.modalType) {
            this.modalType = modalType
            //this.isFirstOpen = true;
            this.centralController.messagePanel.pushToMessageBoard(this.centralController.character.year, 
                this.centralController.character.day, content.title + ' ' + content.desc);    
        }
        

        const modalWidth = '35rem';

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border shadow-lg rounded-md bg-white"
                style={{ width: modalWidth }}>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {content.title}
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-lg text-gray-500">
                            {content.desc}
                        </p>
                    </div>
                    <div className="flex justify-center mt-4">
                        { Button(content.buttonText, 
                            "px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300",
                            {},
                            modalClickFnc
                        ) }
                    </div>
                </div>
            </div>
            </div>
        );
    }

}