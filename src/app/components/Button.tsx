import { ExplorableZone } from "../data/exploration/ExplorableZone";
import IconSwordEmblem from '../assets/icons/swords-emblem.svg';

export default function Button(label: string, 
    onClick: () => void,
    className?: string, 
    dynamicStyle?: object
    ) {

    return (
        <button 
            className={ className }
            style={ dynamicStyle }
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

export function ButtonActivity(id: string, 
    title: string, 
    desc: string,
    rankDesc: string,
    gainDesc: string,
    totalExpRank: number,
    currExpRank: number, 
    onClick: () => void,
    isSelected: boolean = false ) {

    function getSelectedStatus() {
        return isSelected ? ' activity-selected' : '';
    }

    return (
        <button id={ id } key={ id }
            className={ 'activity-button item-style' + getSelectedStatus() }
            onClick={ onClick }
            >
            <div className="activity-overview">
                <label className="activity-desc">{ title }</label>
                <div className="activity-rank">
                    <span>{ rankDesc } </span>
                </div>
            </div>
            <div className="activity-overview">
                <div className="activity-desc">        
                    <span>{ desc }</span>
                </div>
                <div className="activity-rank">
                    <span>{ gainDesc } </span>
                </div>
            </div>
            <progress style={{ width: '100%' }} max={ totalExpRank } value={ currExpRank }/>
        </button>
    );
}

export function ButtonExplorableZone(zone: ExplorableZone,
    onClick: () => void ) {

    return (
        <button id={ zone.id.toString() } key={ zone.id.toString() }
            className={ 'zone-button item-style' }
            onClick={ onClick }
            >
            <div className="zone-header">
                <label>{ zone.title }</label>
                <div className="zone-complete">
                    { zone.isComplete }
                </div>                
            </div>

            <div className="zone-header">
                <div className="zone-desc">        
                    <span>{ zone.desc }</span>
                </div>
                <div className="zone-power">
                    <span>
                        { zone?.minPowerReq }
                        <IconSwordEmblem style={{ width: '25px', height: '25px', marginLeft: '5px' }}/>
                    </span>
                </div>
            </div>

        </button>
    );
}