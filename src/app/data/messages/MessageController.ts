import { Calendar } from "../Calendar";
import { CharacterController } from "../character/CharacterController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { Message } from "./Message";
import { MessageType } from "./MessageTypeEnum";
import { MessageVO } from "./MessageVO";

export class MessageController {

    private static messageList: Message[] = [];

    private static messagesToggled: MessageType[] = [
            MessageType.GENERAL,
            MessageType.FIGHT,
            MessageType.ITEM,
            MessageType.EVENT
        ];

    private static readonly MESSAGE_BOARD_MAX_SIZE: number = 30;

    static toggleMessageDisplayType(messageType: MessageType) {
        const typeEnabled = this.isTypeToggled(messageType);
        if (typeEnabled) {
            const index = this.messagesToggled.indexOf(messageType);
            this.messagesToggled.splice(index, 1);
        } else {
            this.messagesToggled.push(messageType);
        }
    }

    static isTypeToggled(messageType: MessageType) {
        return this.messagesToggled.includes(messageType);
    }

    /**
     * Pushes a general message to board
     * @param message 
     */
    static pushMessageGeneral(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.messageList.push(new Message(life, year, MessageType.GENERAL, message));
    }

    /**
     * Pushes a fight message to board
     * @param message 
     */
    static pushMessageFight(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.messageList.push(new Message(life, year, MessageType.FIGHT, message));
    }

    /**
     * Pushes an item / loot message to board
     * @param message 
     */
    static pushMessageItem(message: string, itemId?: ItemIdEnum) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.messageList.push(new Message(life, year, MessageType.ITEM, message, itemId));
    }

    /**
     * Pushed a story message to board
     * @param message 
     */
    static pushMessageStory(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.messageList.push(new Message(life, year, MessageType.STORY, message));
    }

     /**
     * Pushed a event message to board
     * @param message 
     */
     static pushMessageEvent(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.messageList.push(new Message(life, year, MessageType.EVENT, message));
    }

    private static getToggledMessageTypes() {
        return this.messagesToggled;
    }

    static getMessageBoardMessages() : MessageVO[] {
        const toggledMessageTypes = this.getToggledMessageTypes();

        let orderedLastMsg = this.messageList
            .filter(msg => toggledMessageTypes.includes(msg.type));



        if (orderedLastMsg.length > this.MESSAGE_BOARD_MAX_SIZE) {
            orderedLastMsg = orderedLastMsg.slice(orderedLastMsg.length-1-this.MESSAGE_BOARD_MAX_SIZE);
        }

        return orderedLastMsg.map(msg => new MessageVO(msg));
    }

    static getJournalMessages() {
        const reverseOrderLastMsg = [];

        for (let index = 0; index < this.messageList.length; index++) {
            const msgPos = this.messageList.length-1-index;
            if (this.messageList[msgPos].type == MessageType.STORY) {
                reverseOrderLastMsg[index] = this.messageList[msgPos];
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

    static exportSaveData() : Record<string, unknown> {
        return {
            messageList: this.messageList,
            messagesToggled: this.messagesToggled
        }
    }

    static importSaveData(dataObject: Partial<Record<string, unknown>>) {
        //empty object is not processed
        if (!dataObject) {
            return;
        }

        this.messageList = dataObject['messageList'] as Message[];

        this.messagesToggled = dataObject['messagesToggled'] as MessageType[];
    }
}
