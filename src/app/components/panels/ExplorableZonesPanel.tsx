'use client'

import { ButtonExplorableZone } from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";

export default function ExplorableZonesPanel() {

    const explorableZoneList = ExplorationController.getListExplorableZones();
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
            ExplorationController.doClickZone.bind(ExplorationController, zone.id)
        )
        
    });

    return <div style={ mainStyle }>
            {preparedList}
        </div>;
    
}
