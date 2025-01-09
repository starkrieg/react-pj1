
const tooltipId = 'tooltip-div';

export function Tooltip() {
    return (
        <div id={ tooltipId } className="tooltip tooltip-hidden">
            This is a tooltip
        </div>
    );
}

export const showTooltip = (event: React.MouseEvent<HTMLElement>, text: string) => {
    const tooltipElm = document.getElementById(tooltipId);
    if (tooltipElm) {
        tooltipElm.animate({
            left: `${event.clientX}px`,
            top: `${event.clientY}px`
        
        }, {duration: 0, fill: "forwards"})
        tooltipElm.textContent = text;
        tooltipElm.classList.remove('tooltip-hidden');
    }
}

export function hideTooltip() {
    const tooltipElm = document.getElementById(tooltipId);
    if (tooltipElm) {
        tooltipElm.classList.add('tooltip-hidden');
    }
}