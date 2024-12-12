'use client'

import { Message } from "@/app/data/messages/Message";
import { MessageType } from "@/app/data/messages/MessageTypeEnum";

export default function MessagesPanel(messageList: Message[]) {

    function createText(message: Message) {
        if (message.type == MessageType.STORY) {
            return `${message.charYear}y, ${message.charDay}m: ${message.message}`
        } else {
            return `${message.message}`
        }
    }

    const listMessages = messageList.map(msg => {
        return <li key={msg.id} style={{
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor: 'var(--burnt_umber)'
    }}>
        {createText(msg)}
        </li>
    });

    return <ul>{listMessages}</ul>;

}