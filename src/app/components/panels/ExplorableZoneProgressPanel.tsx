'use client'

import Button from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";

export default function ExplorableZoneProgressPanel() {

    //only selected zone is shown
    const zone = ExplorationController.getSelectedZone();
    
    const className = '';

    return (
        <div style={ { display: '' } } className={ className }>
            <div style={{ textAlign: 'center' }} className="row">
                <div className="col-1">{ zone?.isComplete }</div>
                <div className="col-10">{ zone?.title }</div>
                <div className="col-1">{ zone?.minPowerReq }</div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 10 }} >{ zone?.desc }</div>
            <div style={{ marginBottom: 10 }} className="row">
                { Button('Retreat', 
                    ExplorationController.doClickRetreatFromZone.bind(ExplorationController),
                    'col-1', 
                    {
                        color: 'var(--ivory_white)',
                        backgroundColor: 'var(--deep_crimson)',
                        borderRadius: 5,
                        padding: 5
                    }
                    )}
                <div className="col-10"></div>
                <label style={{ alignContent: 'end' }} className="col-1">
                    { zone?.currProgress + '/' + zone?.zoneSize }
                </label>                
            </div>
            <progress style={{ width: '100%' }} 
                max={ zone?.zoneSize } 
                value={ zone?.currProgress }/>
            
        </div>
    );

}

/* function getFightPanel() {
    return (
        <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-3">
                Player
            </div>
            <div className="col-6">

            </div>
            <div className="col-3">
                Enemy
            </div>
        </div>
    );
} */