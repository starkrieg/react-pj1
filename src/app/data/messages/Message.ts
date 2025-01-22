import { ItemIdEnum } from "../items/ItemIdEnum";
import { MessageType } from "./MessageTypeEnum";

export class Message {
    
    // message id is to track message sequences
    id: number;
    life: number;
    year: number;
    type: MessageType;
    message: string;
    objectReference?: ItemIdEnum;
  
    constructor(life: number, year: number, type: MessageType, message: string, objectReference?: ItemIdEnum) {
        //messages tracked with instant as id
        this.id = Date.now();
        this.life = life;
        this.year = year;
        this.type = type;
        this.message = message;
        this.objectReference = objectReference;
    } 
}
