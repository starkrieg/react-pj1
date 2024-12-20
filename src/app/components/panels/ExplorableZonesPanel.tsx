'use client'

import { ButtonExplorableZone } from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";

export default function ExplorableZonesPanel() {

    const explorableZoneList = ExplorationController.getListExplorableZonesVO();
    
    const preparedList = Array.from(explorableZoneList).map(zoneVO => {
        
        return ButtonExplorableZone(zoneVO,
            ExplorationController.doClickZone.bind(ExplorationController, zoneVO)
        )
        
    });

    return <div className="zones">
                <div className="zones-list">
                    {preparedList}
                </div>
            </div>;
    
}
