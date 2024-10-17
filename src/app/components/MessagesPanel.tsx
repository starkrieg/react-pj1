'use client'

class Message {
    
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

export default class MessagesPanel {

    messageList: Message[];

    constructor(){
        this.messageList = [];
    }

    reset() {
        this.messageList = [];
    }

    pushToMessageBoard(characterYear: number, characterDay: number, message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, characterYear, characterDay, message));
    }

    /*
    single message expected format:
    {
        characterY: character.year,
        characterM: character.day
        message: message
    }
        */
    createMessagesPanel() {
        const reverseOrderLastMsg = [];
        const listSize = 10;

        for (let index = 0; index < listSize && index < this.messageList.length; index++) {
            reverseOrderLastMsg[index] = this.messageList[this.messageList.length-1-index];
            reverseOrderLastMsg[index].id = index;
        }

        const listMessages = reverseOrderLastMsg.map(msg => {
            return <li key={msg.id} style={{
            borderBottomWidth: 1,
            borderBottomStyle: 'dashed',
            borderBottomColor: 'black'
        }}>
            {msg.charYear}y, {msg.charDay}m: {msg.message}
            </li>
        });

        return <ul>{listMessages}</ul>;
    }

}