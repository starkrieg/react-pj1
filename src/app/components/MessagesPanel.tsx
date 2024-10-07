
class Message {
    
    id: number;
    charYear: number;
    charMonth: number;
    message: string;

    constructor(id: number, charYear: number, charMonth: number, message: string) {
        this.id = id;
        this.charYear = charYear;
        this.charMonth = charMonth;
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

    pushToMessageBoard(characterYear: number, characterMonth: number, message: string) {
        const id = this.messageList.length + 1;
        this.messageList.push(new Message(id, characterYear, characterMonth, message));
    }

    /*
    single message expected format:
    {
        characterY: character.year,
        characterM: character.month
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
            {msg.charYear}y, {msg.charMonth}m: {msg.message}
            </li>
        });

        return <ul>{listMessages}</ul>;
    }

}