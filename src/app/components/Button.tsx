import { ExplorableZone } from "../data/exploration/ExplorableZone";

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
    onClick: () => void
    ) {

    return (
        <button 
            className={ 'navigation-button' }
            onClick={ onClick }
            >
            { label }
        </button>
    );
}

export function ButtonActivity(id: string, 
    title: string, 
    desc: string,
    rankGainText: string,
    totalExpRank: number,
    currExpRank: number, 
    onClick: () => void ) {

    return (
        <button id={ id } key={ id }
            className={ 'activity-button item-style'  }
            onClick={ onClick }
            >
            <label>{ title }</label>
            <div className="activity-overview">
                <div className="activity-desc">        
                    <span>{ desc }</span>
                </div>
                <div className="activity-rank">
                    <span>{ rankGainText } </span>
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
                    <span>{ zone.minPowerReq }</span>
                </div>
            </div>

        </button>
    );
}