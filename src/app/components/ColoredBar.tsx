
export function HealthBar(value: number, maxValue: number) {
    return (
        <div className="health-bar">
            <progress value={ value } max={ maxValue } ></progress>
            <div className="progress-bar-overlay">
                { value }
            </div>
        </div>
    );
}

export function ExperienceBar(value: number, maxValue: number) {
    return (
        <div className="experience-bar">
            <progress value={ value } max={ maxValue } ></progress>
            <div className="progress-bar-overlay">
                { value } / { maxValue }
            </div>
        </div>
    );
}