import { ItemIdEnum } from "../items/ItemIdEnum";
import { Utilities } from "../utils/Utilities";
import { ZoneIdEnum } from "./ZoneIdEnum";
import { ZoneLoot } from "./ZoneLoot";

export class Zone {

    id: ZoneIdEnum;
    title: string;
    desc: string;

    //how many fights must be won to finish this zone and get clear reward
    zoneSize: number;
    
    //minimum recomended power - affects overall difficulty of fights and battle experience gained
    basePower: number;

    //zone is marked complete after finished first time
    //used to control first clear reward
    isComplete: boolean;

    //current progress on the zone
    currProgress: number;

    //current step power;
    currentStepPower: number;

    //first time clear reward for this zone
    listClearRewardItemId: ItemIdEnum[];

    //list of possible loots in a zone
    lootList: ZoneLoot[];

    //list of available enemies for this zone
    enemyList: string[];

    unlockRequirements: (ItemIdEnum | ZoneIdEnum)[]

    constructor(id: ZoneIdEnum, title: string, desc: string,
        combatSize: number, basePower: number, 
        unlockRequirements: (ItemIdEnum | ZoneIdEnum)[],
        listClearRewardItemId: ItemIdEnum[],
        lootList: ZoneLoot[],
        enemyList: string[]) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        
        this.zoneSize = combatSize;
        this.currProgress = 1;
        this.basePower = basePower;
        this.currentStepPower = basePower;
        this.isComplete = false;
        this.unlockRequirements = unlockRequirements;
        this.listClearRewardItemId = listClearRewardItemId;
        this.lootList = lootList;
        this.enemyList = enemyList;
    }

    /**
     * Progresses the zone by 1 step.
     * When current progress reaches the zone end,
     * Then zone is set as completed
     * And progress on zone is reset.
     * 
     * @returns boolean - if the zone is cleared first time
     */
    progressZone() {
        this.currProgress += 1;
        if (this.currProgress >= this.zoneSize) {
            this.currProgress = 1;
            this.updateCurrentStepPower();
            if (!this.isComplete) {
                this.isComplete = true;
                return true;
            }
        }
        this.updateCurrentStepPower();
        return false;
    }

    resetZoneClear() {
        this.isComplete = false;
        this.clearProgress();
    }

    /**
     * Clears progress on zone
     */
    clearProgress() {
        this.currProgress = 1;
        this.updateCurrentStepPower();
    }

    private updateCurrentStepPower() {
        this.currentStepPower = this.basePower;
    }

    /**
     * Obtains power requirement for current step on zone
     */
    getCurrentStepPowerReq() {
        return this.currentStepPower;
    }

    getBaseExpReward() {
        return this.basePower / 10
    }

    getLootList() {
        return this.lootList;
    }

    getRandomEnemyName() {
        const randomIndex = Utilities.roundTo0Decimal(Math.random() * (this.enemyList.length-1));
        return this.enemyList[randomIndex];
    }

}