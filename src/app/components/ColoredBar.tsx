
export function HealthBar(value: number, maxValue: number) {
    return (
        <div>
            <progress className="health-bar" style={{ width: '100%' }} 
            value={ value } max={ maxValue } />
            <label style={{
                position: 'relative',
                textAlign: 'center',
                top: -18
            }}>
                { value }
            </label>
        </div>
    );
}