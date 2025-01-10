
const tooltipId = 'tooltip-div';

export function Tooltip() {
    return (
        <div id={ tooltipId } className="tooltip tooltip-hidden"/>
    );
}

/**
 * 
 * @param event 
 * @param content 
 */
export const showTooltip = (event: React.MouseEvent<HTMLElement>, content: Node) => {
    const tooltipElem = document.getElementById(tooltipId);
    if (tooltipElem) {
        //remove all existing children from tooltip
        while (tooltipElem.lastChild) {
            tooltipElem.removeChild(tooltipElem.lastChild);
        }
        tooltipElem.animate({
            left: `${event.clientX}px`,
            top: `${event.clientY}px`
        
        }, {duration: 0, fill: "forwards"})
        tooltipElem.appendChild(content)
        tooltipElem.classList.remove('tooltip-hidden');
    }
}

export function hideTooltip() {
    const tooltipElem = document.getElementById(tooltipId);
    if (tooltipElem) {
        tooltipElem.classList.add('tooltip-hidden');
    }
}