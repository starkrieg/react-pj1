export enum ItemTypeEnum {
    TEMPORARY = 'temporary' // no direct effects and disappear on death - used to unlock content
    ,PERMANENT = 'permanent' // no direct effects and never disappear - used to unlock content
    ,WEAPON = 'weapon' // affect power calculation and disappear on death
    ,ARMOR = 'armor' // affect health calculation and disappear on death
    ,CONSUMABLE = 'consumable' // affects an attribute 1 time and gets expended - used for pills
    ,ALLY = 'ally' // allied forces - modify power and health by a percentage - user for mercenaries and beasts and etc
}