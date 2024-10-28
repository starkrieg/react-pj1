'use client'

import { Message } from "@/app/data/Message";

export default function MessagesPanel(messageList: Message[]) {

    const listMessages = messageList.map(msg => {
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