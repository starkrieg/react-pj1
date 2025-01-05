import IconSwordEmblem from '../assets/icons/swords-emblem.svg';
import IconPause from '../assets/icons/pause-button.svg';
import IconPlay from '../assets/icons/play-button.svg';
import IconFastForward from '../assets/icons/fast-forward-button.svg';
import { IActivity } from "../data/activities/IActivity";
import { Utilities } from "../data/utils/Utilities";
import { ActivityRank } from "../data/activities/ActivityRank";
import { MessageType } from "../data/messages/MessageTypeEnum";
import { MessageController } from "../data/messages/MessageController";
import { MarketItem } from "../data/market/MarketItem";
import { MarketController } from "../data/market/MarketController";
import { GenericActivity } from "../data/activities/GenericActivity";
import { ZoneVO } from "../data/exploration/ZoneVO";
import { PerformOddJobs } from '../data/activities/PerformOddJobs';
import { CoinPouchLabel, CoinPouchSpan } from './Coins';

export default function Button(label: string, 
    onClick: () => void,
    className?: string, 
    dynamicStyle?: object,
    isDisabled: boolean = false
    ) {

    return (
        <button 
            className={ className }
            style={ dynamicStyle }
            onClick={ onClick }
            disabled={ isDisabled }
            >
            { label }
        </button>
    );
}

export function ButtonGameSpeedPause(onClick: () => void,
    isSelected: boolean
    ) {

    const className = 'speed-button';
    const toggledClassName = isSelected ? 'speed-button-toggled' : ''

    return (
        <button 
            className={ `${className} ${toggledClassName}` }
            onClick={ onClick }
            >
            <IconPause style={{ width: '20px', height: '20px', margin: 'auto 0px' }}/>
        </button>
    );
}

export function ButtonGameSpeedPlay(onClick: () => void,
    isSelected: boolean
    ) {

    const className = 'speed-button';
    const toggledClassName = isSelected ? 'speed-button-toggled' : ''

    return (
        <button 
            className={ `${className} ${toggledClassName}` }
            onClick={ onClick }
            >
            <IconPlay style={{ width: '20px', height: '20px', margin: 'auto 0px' }}/>
        </button>
    );
}

export function ButtonGameSpeedFastForward(onClick: () => void,
    isSelected: boolean
    ) {

    const className = 'speed-button';
    const toggledClassName = isSelected ? 'speed-button-toggled' : ''

    return (
        <button 
            className={ `${className} ${toggledClassName}` }
            onClick={ onClick }
            >
            <IconFastForward style={{ width: '20px', height: '20px', margin: 'auto 0px' }}/>
        </button>
    );
}

export function ButtonGameSpeedCustom(label: string, 
    onClick: () => void,
    isSelected: boolean
    ) {

    const className = 'speed-button';
    const toggledClassName = isSelected ? 'speed-button-toggled' : ''

    return (
        <button 
            className={ `${className} ${toggledClassName}` }
            onClick={ onClick }
            >
            { label }
        </button>
    );
}

export function ButtonNavigation(label: string, 
    onClick: () => void,
    isSelected: boolean = false
    ) {

    function getSelectedStatus() {
        return isSelected ? ' navigation-button-selected' : '';
    }

    return (
        <button 
            className={ 'navigation-button' + getSelectedStatus() }
            onClick={ onClick }
            >
            { label }
        </button>
    );
}

export function ButtonActivity(act: IActivity,
    actRank: ActivityRank,
    onClick: () => void,
    isSelected: boolean = false ) {

    const rankDesc = 'Rank ' 
        + actRank.rank;


    let gainDesc = <span></span>;
    if (act instanceof GenericActivity) {
        gainDesc = <span>{act.gainDesc} {Utilities.roundTo2Decimal(act.getTickGain())}%</span>;
    } else if (act instanceof PerformOddJobs) {
        const days = act.getEffectiveWorkDays();
        const coins = Utilities.roundTo0Decimal(act.getTickGain());
        gainDesc = <span>{CoinPouchSpan(coins)} every {days} day(s)</span>;
    } else {
        gainDesc = <span>{Utilities.roundTo2Decimal(act.getTickGain())} per day</span>;
    }

    function getSelectedStatus() {
        return isSelected ? ' activity-selected' : '';
    }

    return (
        <button id={ act.id.toString() } key={ act.id.toString() }
            className={ 'activity-button item-style' + getSelectedStatus() }
            onClick={ onClick }
            >
            <div className="activity-overview">
                <label className="activity-desc">{ act.title }</label>
                <div className="activity-rank">
                    <span>{ rankDesc } </span>
                </div>
            </div>
            <div className="activity-overview">
                <div className="activity-desc">        
                    <span>{ act.desc }</span>
                </div>
                <div className="activity-rank">
                    { gainDesc }
                </div>
            </div>
            <progress style={{ width: '100%' }} 
                max={ actRank.totalExpToNextRank } 
                value={ actRank.exp }/>
        </button>
    );
}

export function ButtonExplorableZone(zone: ZoneVO,
    onClick: () => void ) {

    function ZoneCompleteMarker() {
        return (
            <span className="zone-checked" />
        )
    }

    return (
        <button id={ zone.id.toString() } key={ zone.id.toString() }
            className={ 'zone-button item-style' }
            onClick={ onClick }
            >
            <div className="zone-header">
                <label>{ zone.title }</label>
                <div className="zone-complete">
                    { zone.isComplete && ZoneCompleteMarker() }
                </div>                
            </div>

            <div className="zone-header">
                <div className="zone-desc">        
                    <span>{ zone.desc }</span>
                </div>
                <div className="zone-power">
                    <span>
                        { zone.power }
                        <IconSwordEmblem style={{ width: '25px', height: '25px', marginLeft: '5px' }}/>
                    </span>
                </div>
            </div>

        </button>
    );
}

export function ButtonMessageTypeToggle(messageType: MessageType) {
    const isTypeToggled = MessageController.isTypeToggled(messageType);

    function getToggledStyle() {
        return isTypeToggled ? ' messages-button-toggled' : ''
    }

    const capitalizedText = messageType.toString().charAt(0).toUpperCase() 
        + messageType.toString().slice(1);

    return (
        <button 
            className={ 'messages-button' + getToggledStyle() }
            onClick={ MessageController.toggleMessageDisplayType.bind(MessageController, messageType) }
            >    
            { capitalizedText }
        </button>
    );
}

export function ButtonMarketItem(marketItem: MarketItem, canBuy: boolean) {

    function readableZone() {
        const originalText = marketItem.baseItem.itemZone;
        return originalText.split('-')
            .map(string => {
                return string.at(0)?.toUpperCase() + string.substring(1);
            }).join(' ');
    }

    function canBuyStyle() {
        return canBuy ? '' : ' market-item-cannot-buy';
    }

    return (
        <button className={'market-item' + canBuyStyle() }
            onClick={ MarketController.buyItem.bind(MarketController, marketItem) }
            >
            <div className="market-item-name">{marketItem.name}</div>
            <div className="market-item-desc">{marketItem.baseItem.description}</div>
            <div className="market-item-desc">{marketItem.description}</div>
            <div className="market-item-cost">{ CoinPouchLabel(marketItem.cost) }</div>
            <div className="market-item-region">{readableZone()}</div>
        </button>
    );
}