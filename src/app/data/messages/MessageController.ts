import { CharacterController } from "../character/CharacterController";
import { Message } from "./Message";

export class MessageController {

    private static messageList: Message[] = [];

    /*
    single message expected format:
    {
        characterY: character.year,
        characterM: character.day
        message: message
    }
    */
    static pushMessageSimple(message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, 0, 0, 'common', message));
    }

    static pushMessageJournal(message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, CharacterController.character.year, CharacterController.character.day, 'main', message));
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
            if (this.messageList[msgPos].type == 'main') {
                reverseOrderLastMsg[index] = this.messageList[msgPos];
                reverseOrderLastMsg[index].id = index;
            }
        }

        return reverseOrderLastMsg;
    }

    static reset() {
        this.messageList = [];
    }
}
