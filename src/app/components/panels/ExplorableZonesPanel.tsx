'use client'

import { ButtonExplorableZone } from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";

export default function ExplorableZonesPanel() {

    const explorableZoneList = ExplorationController.getListExplorableZones();
    
    const preparedList = Array.from(explorableZoneList).map(zone => {
        
        return ButtonExplorableZone(zone,
            ExplorationController.doClickZone.bind(ExplorationController, zone.id)
        )
        
    });

    return <div className="zones">
                <div className="zones-list">
                    {preparedList}
                </div>
            </div>;
    
}
