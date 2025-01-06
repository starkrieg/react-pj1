import { Utilities } from "../data/utils/Utilities";

export function HealthBar(value: number, maxValue: number) {
    return (
        <div className="health-bar">
            <progress value={ value } max={ maxValue } ></progress>
            <div className="progress-bar-overlay">
                { Utilities.toScientificFormat(value) }
            </div>
        </div>
    );
}

export function ExperienceBar(value: number, maxValue: number) {
    return (
        <div className="experience-bar">
            <progress value={ value } max={ maxValue } ></progress>
            <div className="progress-bar-overlay">
                { Utilities.toScientificFormat(value) } / { Utilities.toScientificFormat(maxValue) }
            </div>
        </div>
    );
}

export function CalendarTickBar(value: number, maxValue: number) {
    return (
        <div className="calendar-tick-bar">
            <progress value={ value } max={ maxValue } ></progress>
        </div>
    );
}