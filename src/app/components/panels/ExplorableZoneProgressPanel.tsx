'use client'

import Button from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";

export default function ExplorableZoneProgressPanel() {

    //only selected zone is shown
    const zone = ExplorationController.getSelectedZone();

    return (
        <div style={ { display: '' } } className={ 'zones item-style' }>
            <div>
                <div className="zone-header">
                    <label>{ zone?.title }</label>
                    <div className="zone-complete">
                        { zone?.isComplete }
                    </div>                
                </div>

                <div className="zone-header">
                    <div className="zone-desc">        
                        <span>{ zone?.desc }</span>
                    </div>
                    <div className="zone-power">
                        <span>{ zone?.minPowerReq }</span>
                    </div>
                </div>

                <div style={{ marginBottom: 10, marginTop: 10 }} className="row">
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