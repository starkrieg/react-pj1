import { ExplorableZone } from "./zones/ExplorableZone";
import { ExploreZoneEnum } from "./zones/ExploreZoneEnum";

export class ExplorationController {

    selectedZone: ExploreZoneEnum;
    explorableZoneList: ExplorableZone[];

    constructor() {
        this.selectedZone = ExploreZoneEnum.NOTHING;
        this.explorableZoneList = [];
        this.setupExplorableZoneList();
    }

    reset() {
        this.selectedZone = ExploreZoneEnum.NOTHING;
        this.setupExplorableZoneList();
    }
    
    getSelectedExplorableZoneTitle() {
        const title = this.explorableZoneList.find((zone) => zone.id == this.selectedZone)?.title
        return title || 'Nothing';
    }
    
    setupExplorableZoneList() {
        this.explorableZoneList = []
    
        this.explorableZoneList.push(new ExplorableZone(
            ExploreZoneEnum.VILLAGE_DOJO,
            'Village Dojo',
            'Face off against some wood dolls and novice warriors',
            10,
            1));
          
    }
    
    doClickZone(zoneId: ExploreZoneEnum) {
        // is no zone selected, then select one
        // if this zone already selected, then remove selection
        // if another zone selected, then select this new one now
        if (this.selectedZone != zoneId) {
            this.selectedZone = zoneId;
        } else {
            this.getSelectedZone()?.clearProgress();
            this.selectedZone = ExploreZoneEnum.NOTHING
        }
    }

    private getSelectedZone() {
        return this.explorableZoneList.find((zone) => zone.id == this.selectedZone);
    }

    doExploreSelectedZone() {
        this.getSelectedZone()?.action();
    }

}