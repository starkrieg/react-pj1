import { ItemIdEnum } from "../items/ItemIdEnum";
import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";

export class ExplorableZone {

    id: ExploreZoneIdEnum;
    title: string;
    desc: string;

    //how many fights must be won to finish this zone and get clear reward
    zoneSize: number;
    
    //minimum recomended power - affects overall difficulty of fights and battle experience gained
    basePower: number;

    //zone is marked complete after finished first time
    //used to control first clear reward
    isComplete: boolean;

    //reward // a ref for the reward for this zone
    //secretReward // a ref for secret things that can be found, by chance, while exploring
    //on a second run, all found/known secret rewards are found first

    //current progress on the zone
    currProgress: number;

    //current step power;
    currentStepPower: number;

    //first time clear reward for this zone
    listClearRewardItemId: ItemIdEnum[];

    // zones have big sizes, and must be completed on a single run
    // so every step shouldn't increase difficulty too much
    // every step on the zone increases power req by 5% based on the minimum requirement
    private readonly POWER_INCREASE_PER_STEP = 0.05

    unlockRequirements: (ItemIdEnum | ExploreZoneIdEnum)[]

    constructor(id: ExploreZoneIdEnum, title: string, desc: string,
        combatSize: number, basePower: number, 
        unlockRequirements: (ItemIdEnum | ExploreZoneIdEnum)[],
        listClearRewardItemId: ItemIdEnum[]) {
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

    /**
     * Clears progress on zone
     */
    clearProgress() {
        this.currProgress = 1;
        this.updateCurrentStepPower();
    }

    private updateCurrentStepPower() {
        this.currentStepPower = this.basePower * (1 + ((this.currProgress-1) * this.POWER_INCREASE_PER_STEP));
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

    getAvailableResources() {
        const maximumResourceAmount = this.basePower / 10;
        return {
            qi: maximumResourceAmount,
            body: maximumResourceAmount,
            coin: (maximumResourceAmount + 1)
        };
    }

}