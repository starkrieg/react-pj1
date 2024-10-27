import { Message } from "./Message";

export class MessageController{

    messageList: Message[];

    constructor() {
        this.messageList = [];
    }

    /*
    single message expected format:
    {
        characterY: character.year,
        characterM: character.day
        message: message
    }
    */
    pushMessage(characterYear: number, characterDay: number, message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, characterYear, characterDay, message));
    }

    getLast10Message() {
        const reverseOrderLastMsg = [];
        const listSize = 10;

        for (let index = 0; index < listSize && index < this.messageList.length; index++) {
            reverseOrderLastMsg[index] = this.messageList[this.messageList.length-1-index];
            reverseOrderLastMsg[index].id = index;
        }

        return reverseOrderLastMsg;
    }

    reset() {
        this.messageList = [];
    }
}
