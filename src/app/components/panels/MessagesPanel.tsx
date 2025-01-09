'use client'

import { MessageType } from "@/app/data/messages/MessageTypeEnum";
import { ButtonMessageTypeToggle } from "../Button";
import { MessageController } from "@/app/data/messages/MessageController";
import { MessageVO } from "@/app/data/messages/MessageVO";
import { Utilities } from "@/app/data/utils/Utilities";
import { AttributeTypeEnum } from "@/app/data/character/AttributeTypeEnum";
import { CoinPouchLabel } from "../Coins";

export default function MessagesPanel() {

    const messageList: MessageVO[] = MessageController.getMessageBoardMessages()

    function formatMessage(message: MessageVO, listIndex: number) : JSX.Element {
        let life = '';

        if (message.life > 1) {
            life = `Life ${message.life}, `;
        }

        let formattedMessage = `${message.message}`;
        let formattedDetails = undefined;
        let messageClass = '';        

        if (message.type == MessageType.EVENT) {
            formattedMessage = `${life}${message.year}y: ${message.message}`;
            messageClass = ' message-event';
        } else if (message.type == MessageType.STORY) {
            formattedMessage = `${life}${message.year}y: ${message.message}`
        } else if (message.type == MessageType.ITEM) {
            messageClass = ' message-loot';
            if (message.objectReference) {
                const itemEffects = message.objectReference.effects.map(effect => {
                    const displayValue = Utilities.toScientificFormat(effect.value);
                    const displayAttribute = Utilities.toFirstLetterUpperAllWords(effect.attribute)
                    switch(effect.attribute) {
                    case AttributeTypeEnum.INTERNAL_DAMAGE:
                        return <div>{displayAttribute} decreased by {displayValue}</div>;
                    case AttributeTypeEnum.COIN:
                        return <div className="coin-pouch-label">{displayAttribute} increased by { CoinPouchLabel(effect.value) }</div>;
                    default:
                        return <div>{displayAttribute} increased by {displayValue}</div>;
                    }
                });
                formattedDetails = <div>
                        { itemEffects }
                    </div>;
            }
        }

        return (
            <div key={listIndex} className={'message-list-item' + messageClass}>
                { formattedMessage }
                { formattedDetails }
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
                { ButtonMessageTypeToggle(MessageType.ITEM) }
                { ButtonMessageTypeToggle(MessageType.EVENT) }
            </div>
            <div className="message-list">
                {listMessages}
            </div>
        </div>
    );

}