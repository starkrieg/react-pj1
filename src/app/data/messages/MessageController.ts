import { Calendar } from "../Calendar";
import { CharacterController } from "../character/CharacterController";
import { Message } from "./Message";
import { MessageType } from "./MessageTypeEnum";

export class MessageController {

    private static messageList: Message[] = [];

    private static messagesToggled: MessageType[] = [
            MessageType.GENERAL,
            MessageType.FIGHT,
            MessageType.LOOT,
            MessageType.ITEM,
            MessageType.EVENT
        ];

    private static readonly MESSAGE_BOARD_MAX_SIZE: number = 10;

    static toggleMessageDisplayType(messageType: MessageType) {
        const typeEnabled = this.isTypeToggled(messageType);
        if (typeEnabled) {
            const index = this.messagesToggled.indexOf(messageType);
            this.messagesToggled.splice(index, 1);
            if (messageType == MessageType.LOOT) {
                const index = this.messagesToggled.indexOf(MessageType.ITEM);
                this.messagesToggled.splice(index, 1);
            }
        } else {
            this.messagesToggled.push(messageType);
            if (messageType == MessageType.LOOT) {
                this.messagesToggled.push(MessageType.ITEM);
            }
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
     * Pushes an item message to board
     * @param message 
     */
    static pushMessageItem(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.messageList.push(new Message(life, year, MessageType.ITEM, message));
    }

    /**
     * Pushes a loot message to board
     * @param message 
     */
    static pushMessageLoot(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.messageList.push(new Message(life, year, MessageType.LOOT, message));
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

    static getMessageBoardMessages() {
        const toggledMessageTypes = this.getToggledMessageTypes();

        const orderedLastMsg = this.messageList
            .filter(msg => toggledMessageTypes.includes(msg.type));

        if (orderedLastMsg.length > this.MESSAGE_BOARD_MAX_SIZE) {
            return orderedLastMsg.slice(orderedLastMsg.length-1-this.MESSAGE_BOARD_MAX_SIZE);
        } else {
            return orderedLastMsg;
        }
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
}
