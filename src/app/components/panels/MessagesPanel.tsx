'use client'

import { Message } from "@/app/data/messages/Message";
import { MessageType } from "@/app/data/messages/MessageTypeEnum";
import { ButtonMessageTypeToggle } from "../Button";

export default function MessagesPanel(messageList: Message[]) {

    function formatMessage(message: Message, listIndex: number) {
        let life = '';

        if (message.life > 1) {
            life = `Life ${message.life}, `;
        }

        let formattedMessage = `${message.message}`;
        let messageClass = '';        

        if (message.type == MessageType.EVENT) {
            formattedMessage = `${life}${message.year}y: ${message.message}`;
            messageClass = ' message-event';
        } else if (message.type == MessageType.STORY) {
            formattedMessage = `${life}${message.year}y: ${message.message}`
        } else if ([MessageType.LOOT, MessageType.ITEM].includes(message.type)) {
            messageClass = ' message-loot';
        }
        return (
            <div key={listIndex} className={'message-list-item' + messageClass}>
                {formattedMessage}
            </div>
        );
    }

    const listMessages = messageList.map((msg, idx) => {
        return formatMessage(msg, idx);
    });

    return ( 
        <div className="panel-right col-3">
            <div className={ 'messages-buttons-div' }>
                { ButtonMessageTypeToggle(MessageType.GENERAL) }
                { ButtonMessageTypeToggle(MessageType.FIGHT) }
                { ButtonMessageTypeToggle(MessageType.LOOT) }
                { ButtonMessageTypeToggle(MessageType.EVENT) }
            </div>
            <div className="message-list">
                {listMessages}
            </div>
        </div>
    );

}