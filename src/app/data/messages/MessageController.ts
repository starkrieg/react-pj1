import { CharacterController } from "../character/CharacterController";
import { Message } from "./Message";
import { MessageType } from "./MessageTypeEnum";

export class MessageController {

    private static messageList: Message[] = [];

    /**
     * Pushes a general message to board
     * @param message 
     */
    static pushMessageSimple(message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, 0, 0, MessageType.GENERAL, message));
    }

    /**
     * Pushes a fight message to board
     * @param message 
     */
    static pushMessageFight(message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, 0, 0, MessageType.FIGHT, message));
    }

    /**
     * Pushed a story message to board
     * @param message 
     */
    static pushMessageStory(message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, CharacterController.getCharacter().year, CharacterController.getCharacter().day, MessageType.STORY, message));
    }

    static getLast10Messages() {
        const reverseOrderLastMsg = [];
        const listSize = 10;

        for (let index = 0; index < listSize && index < this.messageList.length; index++) {
            reverseOrderLastMsg[index] = this.messageList[this.messageList.length-1-index];
            reverseOrderLastMsg[index].id = index;
        }

        return reverseOrderLastMsg;
    }

    static getJournalMessages() {
        const reverseOrderLastMsg = [];

        for (let index = 0; index < this.messageList.length; index++) {
            const msgPos = this.messageList.length-1-index;
            if (this.messageList[msgPos].type == MessageType.STORY) {
                reverseOrderLastMsg[index] = this.messageList[msgPos];
                reverseOrderLastMsg[index].id = index;
            }
        }

        return reverseOrderLastMsg;
    }

    /**
     * Resets all data
     * Used on game hard reset
     */
    static hardReset() {
        this.messageList = [];
    }
}
