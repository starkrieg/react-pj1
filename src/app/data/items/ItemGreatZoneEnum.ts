export enum ItemMarketZone {
    // items can belong to a great content zone
    // if zone is locked, the items belonging to it do not appear on market
    NONE = 'none' // not available on any market
    ,SELF = 'self' // universally available items or upgrades
    ,CALM_WIND_VILLAGE = 'calm-wind-village' // starting village area items
    ,CALM_WIND_SECT = 'calm-wind-sect' // calm wind small sect area items
}