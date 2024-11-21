import { ExplorableZone } from "../data/exploration/ExplorableZone";

export default function Button(label: string, 
    className: string, 
    dynamicStyle: object, 
    onClick: () => void ) {

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

export function ButtonActivity(id: string, 
    title: string, 
    desc: string,
    rankGainText: string,
    totalExpRank: number,
    currExpRank: number,
    className: string, 
    dynamicStyle: object, 
    onClick: () => void ) {

    return (
        <button id={ id } key={ id }
            className={ className }
            style={ dynamicStyle }
            onClick={ onClick }
            >
            <p>{ title }</p>
            { desc }
            <p>{ rankGainText } </p>
            <progress style={{ width: '100%' }} max={ totalExpRank } value={ currExpRank }/>
        </button>

    );
}

export function ButtonExplorableZone(zone: ExplorableZone,
    className: string, 
    dynamicStyle: object, 
    onClick: () => void ) {

    return (
        <button id={ zone.id.toString() } key={ zone.id.toString() }
            className={ className }
            style={ dynamicStyle }
            onClick={ onClick }
            >
            <div className="row">
                <div className="col-1">{ zone.isComplete }</div>
                <div className="col-10">{ zone.title }</div>
                <div className="col-1">{ zone.minPowerReq }</div>
            </div>
            <p>{ zone.desc }</p>
        </button>
    );
}