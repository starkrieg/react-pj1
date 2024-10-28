
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