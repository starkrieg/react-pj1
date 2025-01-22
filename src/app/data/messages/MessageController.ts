import { Calendar } from "../Calendar";
import { CharacterController } from "../character/CharacterController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { Message } from "./Message";
import { MessageType } from "./MessageTypeEnum";
import { MessageVO } from "./MessageVO";

export class MessageController {

    //limits amount of displayable messages
    private static readonly MESSAGE_BOARD_MAX_SIZE: number = 30;

    // this should hold the displayable messages based on filters
    private static displayMessageList: MessageVO[] = [];

    // each message type is limited in size, based on board max size
    private static messageMap: Map<MessageType, Message[]> = new Map<MessageType, Message[]>();

    private static messagesToggled: MessageType[] = [
            MessageType.GENERAL,
            MessageType.FIGHT,
            MessageType.ITEM,
            MessageType.EVENT
        ];

    private static pushMessage(type: MessageType, message: Message) {
        if (this.messageMap.has(type)) {
            this.messageMap.get(type)!.push(message);
            // story messages are stored ad infinitum
            // other messages are limited
            if (type != MessageType.STORY
                && this.messageMap.get(type)!.length > this.MESSAGE_BOARD_MAX_SIZE) {
                // push adds obj to last pos
                // so remove first pos
                this.messageMap.get(type)!.shift();
            }
        } else {
            this.messageMap.set(type, [message]);
        }
        this.updateDisplayMessages();
    }
    
    private static updateDisplayMessages() {
        // group all message types into single array
        // except for Story
        // then order by id / instant
        // take the board limit amount as display list
        const sortedMessages = this.messagesToggled
            // from toggled types, get messages
            .map(type => this.messageMap.get(type) || [])
            .filter(array => array.length > 0)
            // reduce to single array of all toggled messages
            .flat()
            // sort array based on message id
            .toSorted((msgA, msgB) => msgA.id - msgB.id);
        
        if (sortedMessages.length > this.MESSAGE_BOARD_MAX_SIZE) {
            this.displayMessageList = sortedMessages
                //take most recent messages / last ones on array
                .slice(sortedMessages.length-this.MESSAGE_BOARD_MAX_SIZE)
                //map to visual object
                .map(msg => new MessageVO(msg));
        } else {
            this.displayMessageList = sortedMessages
                //map to visual object
                .map(msg => new MessageVO(msg));
        }
    }

    static toggleMessageDisplayType(messageType: MessageType) {
        const typeEnabled = this.isTypeToggled(messageType);
        if (typeEnabled) {
            const index = this.messagesToggled.indexOf(messageType);
            this.messagesToggled.splice(index, 1);
        } else {
            this.messagesToggled.push(messageType);
        }
        this.updateDisplayMessages();
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
        this.pushMessage(MessageType.GENERAL, new Message(life, year, MessageType.GENERAL, message));
    }

    /**
     * Pushes a fight message to board
     * @param message 
     */
    static pushMessageFight(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.pushMessage(MessageType.FIGHT, new Message(life, year, MessageType.FIGHT, message));
    }

    /**
     * Pushes an item / loot message to board
     * @param message 
     */
    static pushMessageItem(message: string, itemId?: ItemIdEnum) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.pushMessage(MessageType.ITEM, new Message(life, year, MessageType.ITEM, message, itemId));
    }

    /**
     * Pushed a story message to board
     * @param message 
     */
    static pushMessageStory(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.pushMessage(MessageType.STORY, new Message(life, year, MessageType.STORY, message));
    }

     /**
     * Pushed a event message to board
     * @param message 
     */
     static pushMessageEvent(message: string) {
        const life = CharacterController.getDeathCount() + 1;
        const year = Calendar.getYear();
        this.pushMessage(MessageType.EVENT, new Message(life, year, MessageType.EVENT, message));
    }

    static getMessageBoardMessages() : MessageVO[] {
        return this.displayMessageList;
    }

    static getJournalMessages() {
        const storyMessages = this.messageMap.get(MessageType.STORY) || [];

        return storyMessages;
    }

    static exportSaveData() : Record<string, unknown> {
        return {
            messageList: this.messageMap.entries().toArray(),
            messagesToggled: this.messagesToggled
        }
    }

    static importSaveData(dataObject: Partial<Record<string, unknown>>) {
        //empty object is not processed
        if (!dataObject) {
            return;
        }

        this.messageMap.clear();

        this.messagesToggled = dataObject['messagesToggled'] as MessageType[];

        const messagesData = dataObject['messageList'] as any[];

        if (messagesData.length > 0) {
            // if import data is a single array list, break it into the messages map
            // if already map, import normally
            if (!(messagesData[0] instanceof Array)) {
                // break into map
                (messagesData as Message[])
                    .forEach((msg) => {
                        // older messages should have smaller ids
                        // meaning only higher ids, more recent messages will be, kept 
                        const newMsg = new Message(msg.life, msg.year, msg.type, msg.message, msg.objectReference);
                        this.pushMessage(msg.type, newMsg);
                    });
            } else {
                // import as map
                (messagesData as [[MessageType, Message[]]])
                    .values()
                    .forEach(([type, values]) => {
                        this.messageMap.set(type, values);
                    });
                this.updateDisplayMessages();
            }
        }

    }
}
