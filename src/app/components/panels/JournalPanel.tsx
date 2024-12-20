'use client'

import { Message } from "@/app/data/messages/Message";
import { MessageType } from "@/app/data/messages/MessageTypeEnum";

export default function JournalPanel(messageList: Message[]) {

    function createText(message: Message) {
        let life = '';

        if (message.life > 1) {
            life = `Life ${message.life}, `;
        }

        if (message.type == MessageType.STORY) {
            return `${life}${message.year}y: ${message.message}`
        } else {
            return `${life}${message.message}`
        }
    }

    const listMessages = messageList.map((msg, idx) => {
        return <li key={idx} style={{
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor: 'var(--burnt_umber)'
    }}>
        {createText(msg)}
        </li>
    });

    return ( 
        <div>
            <ul style={{ height: '100%' }}>
                {listMessages}
            </ul>
        </div>
    );

}