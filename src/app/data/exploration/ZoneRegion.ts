import { ZoneIdEnum } from "./ZoneIdEnum";
import { ZoneRegionEnum } from "./ZoneRegionEnum";

export class ZoneRegion {

    id: ZoneRegionEnum;
    zones: ZoneIdEnum[];

    constructor(id: ZoneRegionEnum, zones: ZoneIdEnum[]) {
        this.id = id;
        this.zones = zones;
    }

}