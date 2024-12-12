import { ItemIdEnum } from "../items/ItemIdEnum";
import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";

export class ExplorableZone {

    id: ExploreZoneIdEnum;
    title: string;
    desc: string;

    //how many fights must be won to finish this zone and get clear reward
    zoneSize: number;
    
    //minimum recomended power - affects overall difficulty of fights and battle experience gained
    minPowerReq: number;

    //zone is marked complete after finished first time
    //used to control first clear reward
    isComplete: boolean;

    //reward // a ref for the reward for this zone
    //secretReward // a ref for secret things that can be found, by chance, while exploring
    //on a second run, all found/known secret rewards are found first

    //current progress on the zone
    currProgress: number;

    //first time clear reward for this zone
    listClearRewardItemId: ItemIdEnum[];

    constructor(id: ExploreZoneIdEnum, title: string, desc: string,
        combatSize: number, minPowerReq: number, listClearRewardItemId: ItemIdEnum[]) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        
        this.zoneSize = combatSize;
        this.currProgress = 1;
        this.minPowerReq = minPowerReq;
        this.isComplete = false;
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
            if (!this.isComplete) {
                this.isComplete = true;
                return true;
            }
        }
        return false;
    }

    /**
     * Clears progress on zone
     */
    clearProgress() {
        this.currProgress = 1;
    }

    /**
     * Obtains power requirement for current step on zone
     */
    getCurrentStepPowerReq() {
        // every step on the zone increases power req by 10% based on the minimum requirement
        return this.minPowerReq * (1 + ((this.currProgress-1) * 0.1));
    }

}