
export function CoinPouchLabel(coins: number) {
    const text = CoinPouchText(coins);

    return (
        <label>Coins: { text }</label>
    );
}

export function CoinPouchText(coins: number) {
    const pouch = CoinsObject(coins);

    function CoinAsText(value: number, type: string) {
        let icon = 'C';
        switch (type) {
            case 'ss':
                icon = 'SS'
                break;
            case 'g':
                icon = 'G'
                break;
            case 's':
                icon = 'S'
                break;
            default:
                break;
        }
        return `${value}${icon}`;
    }

    const text = [];
    if (pouch.spiritualStones > 0) {
        text.push(`${CoinAsText(pouch.spiritualStones, 'ss')}`);
    }
    if (pouch.gold > 0) {
        text.push(`${CoinAsText(pouch.gold, 'g')}`);
    }
    if (pouch.silver > 0) {
        text.push(`${CoinAsText(pouch.silver, 's')}`);
    }
    if (pouch.copper > 0 || text.length == 0) {
        text.push(CoinAsText(pouch.copper, 'c'));
    }
    return text.join(' ');
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