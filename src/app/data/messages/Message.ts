import { ItemIdEnum } from "../items/ItemIdEnum";
import { MessageType } from "./MessageTypeEnum";

export class Message {
    
    life: number;
    year: number;
    type: MessageType;
    message: string;
    objectReference?: ItemIdEnum;
  
    constructor(life: number, year: number, type: MessageType, message: string, objectReference?: ItemIdEnum) {
        this.life = life;
        this.year = year;
        this.type = type;
        this.message = message;
        this.objectReference = objectReference;
    } 
}
