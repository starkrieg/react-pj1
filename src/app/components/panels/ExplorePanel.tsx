'use client'

import { ButtonExplorableZone } from "../Button";
import { ExplorationController } from "@/app/data/ExplorationController";

export default function ExplorePanel(explorationController: ExplorationController) {

    const explorableZoneList = explorationController.explorableZoneList;
    
    const preparedList = explorableZoneList.map(zone => {
        
        return ButtonExplorableZone(
            zone,
            '',
            {
                borderWidth: 1,
                borderColor: 'black',
                borderStyle: 'dashed',
                marginBottom: 5
            },
            explorationController.doClickZone.bind(explorationController, zone.id)
        )
    });

    return <div style={{ display: 'grid' }}>
            {preparedList}
        </div>;
    
}

