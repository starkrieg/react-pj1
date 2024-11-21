
export class Message {
    
    id: number;
    charYear: number;
    charDay: number;
    type: string;
    message: string;
  
    constructor(id: number, charYear: number, charDay: number, type: string, message: string) {
        this.id = id;
        this.charYear = charYear;
        this.charDay = charDay;
        this.type = type;
        this.message = message;
    } 
}
