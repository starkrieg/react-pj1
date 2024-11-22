/**
 * Central list of IDs for Items
 * Goal: make it easier to assign item IDs when creating, setting rewards, or checking if item in possession
 */
export enum ItemIdEnum {
    QI_CULTIVATION_KNOWLEDGE = 'qi-cultivation', //controls the knowledge/ability to cultivate qi, and break through
    CULTIVATION_FOUNDATION_KNOWLEDGE = 'cultivation-foundation' //controls the knowledge about cultivation foundation, shows extra info on screen
    //items here unlock new zones
    ,FOREST_MAP = 'forest-map' //map for forest outside first village
    ,HAUNTED_HOUSE_KEY = 'haunted-house-key' //key that unlocks entrance to haunted house on starting village
}