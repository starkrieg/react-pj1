import { ExploreZoneEnum } from "./ExploreZoneEnum";

export class ExplorableZone {

    id: ExploreZoneEnum;
    title: string;
    desc: string;

    combatSize: number;
    minPowerReq: number;
    isComplete: boolean;

    //reward // a ref for the reward for this zone
    //secretReward // a ref for secret things that can be found, by chance, while exploring
    //on a second run, all found/known secret rewards are found first

    //current progress on the zone
    currProgress: number;

    constructor(id: ExploreZoneEnum, title: string, desc: string,
        combatSize: number, minPowerReq: number) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        
        this.combatSize = combatSize;
        this.currProgress = 0;
        this.minPowerReq = minPowerReq;
        this.isComplete = false;
    }

    action() {
        this.currProgress += 1;
        if (this.currProgress >= this.combatSize) {
            this.isComplete = true;
            this.currProgress = 0;
        }
    }

    clearProgress() {
        this.currProgress = 0;
    }

}