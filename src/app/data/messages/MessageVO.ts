import { Item } from "../items/Item";
import { ItemController } from "../items/ItemController";
import { Message } from "./Message";
import { MessageType } from "./MessageTypeEnum";

export class MessageVO {
    
    life: number;
    year: number;
    type: MessageType;
    message: string;
    objectReference?: Item;
  
    constructor(message: Message) {
        this.life = message.life;
        this.year = message.year;
        this.type = message.type;
        this.message = message.message;
        if (message.objectReference) { 
            this.objectReference = ItemController.getItemById(message.objectReference);
        }
    } 
}
