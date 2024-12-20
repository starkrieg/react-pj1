import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { ZoneRegionEnum } from "../exploration/ZoneRegionEnum";

export class EventMilestone {

    year: number;

    message: string;

    difficultyIncreasePercent: number;

    zonesDifficultyAffected: ZoneIdEnum[];

    regionsBlocked: ZoneRegionEnum[];

    constructor(year: number, message: string,
        difficultyIncreasePercent: number,
        zonesDifficultyAffected: ZoneIdEnum[],
        regionsBlocked: ZoneRegionEnum[]
    ) {
        this.year = year;
        this.message = message;
        this.difficultyIncreasePercent = difficultyIncreasePercent;
        this.zonesDifficultyAffected = zonesDifficultyAffected;
        this.regionsBlocked = regionsBlocked;
    }

}