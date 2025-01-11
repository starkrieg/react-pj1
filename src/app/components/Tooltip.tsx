
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
        const Xpos = event.currentTarget.offsetLeft + event.currentTarget.offsetWidth + 15
        const Ypos = event.currentTarget.offsetTop
        tooltipElem.animate({
            left: `${Xpos}px`,
            top: `${Ypos}px`
        
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