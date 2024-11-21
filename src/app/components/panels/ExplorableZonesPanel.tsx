'use client'

import { ButtonExplorableZone } from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";

export default function ExplorableZonesPanel(explorationController: ExplorationController) {

    const explorableZoneList = explorationController.explorableZoneList;
    const mainStyle = { display: 'grid' };
    
    const preparedList = explorableZoneList.map(zone => {
        
        return ButtonExplorableZone(
            zone,
            '',
            {
                borderWidth: 1,
                borderColor: 'var(--jade_green)',
                borderStyle: 'dashed',
                marginBottom: 5
            },
            explorationController.doClickZone.bind(explorationController, zone.id)
        )
        
    });

    return <div style={ mainStyle }>
            {preparedList}
        </div>;
    
}
