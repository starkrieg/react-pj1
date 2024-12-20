import { MessageType } from "./MessageTypeEnum";

export class Message {
    
    life: number;
    year: number;
    type: MessageType;
    message: string;
  
    constructor(life: number, year: number, type: MessageType, message: string) {
        this.life = life;
        this.year = year;
        this.type = type;
        this.message = message;
    } 
}
