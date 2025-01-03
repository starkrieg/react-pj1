
function CoinValueAsLabel(value: number, type: string) {
    const coinClass = getCoinStyleClass(type);
    return <label>{value}<span className={ coinClass } /></label>
}

function CoinValueAsSpan(value: number, type: string) {
    const coinClass = getCoinStyleClass(type);
    return <span>{value}<span className={ coinClass } /></span>
}

function getCoinStyleClass(type: string) {
    switch (type) {
        case 'ss':
            return 'coin-spiritual-stone';
        case 'g':
            return 'coin-gold';
        case 's':
            return 'coin-silver';
        default:
            return 'coin-copper';
    }
}

export function CoinPouchLabel(coins: number) {
    const obj = CoinsObject(coins);

    const hasSS = obj.spiritualStones > 0;
    const hasG = obj.gold > 0;
    const hasS = obj.silver > 0;
    const hasC = !(hasSS || hasG || hasS) || obj.copper > 0;

    return (
        <div className='coin-pouch-label'>
            { hasSS && CoinValueAsLabel(obj.spiritualStones, 'ss') }
            { hasG && CoinValueAsLabel(obj.gold, 'g') }
            { hasS && CoinValueAsLabel(obj.silver, 's') }
            { hasC && CoinValueAsLabel(obj.copper, 'c') }
        </div>
    );
}

export function CoinPouchSpan(coins: number) {
    const obj = CoinsObject(coins);

    const hasSS = obj.spiritualStones > 0;
    const hasG = obj.gold > 0;
    const hasS = obj.silver > 0;
    const hasC = !(hasSS || hasG || hasS) || obj.copper > 0;

    return (
        <span>
            { hasSS && CoinValueAsSpan(obj.spiritualStones, 'ss') }
            { hasG && CoinValueAsSpan(obj.gold, 'g') }
            { hasS && CoinValueAsSpan(obj.silver, 's') }
            { hasC && CoinValueAsSpan(obj.copper, 'c') }
        </span>
    );
}

function CoinsObject(coins: number) {
    let totalCoins = coins;

    const spiritualStones = Math.floor(totalCoins / 1000000);
    totalCoins -= (spiritualStones * 1000000);

    const gold =  Math.floor(totalCoins / 10000);
    totalCoins -= (gold * 10000);

    const silver = Math.floor(totalCoins / 100);
    const copper = totalCoins - (silver * 100)

    return {
        spiritualStones: spiritualStones,
        gold: gold,
        silver: silver,
        copper: copper
    }
}