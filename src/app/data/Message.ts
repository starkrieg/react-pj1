
export class Message {
    
    id: number;
    charYear: number;
    charDay: number;
    message: string;

    constructor(id: number, charYear: number, charDay: number, message: string) {
        this.id = id;
        this.charYear = charYear;
        this.charDay = charDay;
        this.message = message;
    } 
}
