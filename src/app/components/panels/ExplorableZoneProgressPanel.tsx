'use client'

import Button from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";
import IconCrossedSwords from '../../assets/icons/crossed-swords.svg';
import IconSwordEmblem from '../../assets/icons/swords-emblem.svg';
import FightAttributes from "@/app/data/exploration/FightAttributes";
import { Utilities } from "@/app/data/utils/Utilities";

export default function ExplorableZoneProgressPanel() {

    //only selected zone is shown
    const zone = ExplorationController.getSelectedZone();

    //if no character fight stats, then setup it up
    if (!ExplorationController.getZoneCharacterStats()) {
        ExplorationController.createFightStats();
    }

    const zoneCharacterStats = ExplorationController.getZoneCharacterStats();
    const zoneEnemyStats = ExplorationController.getZoneCurrentEnemyStats();

    function CharHealthStats(type: string, stats: FightAttributes | undefined) {
        let person = 'Someone';
        let classes = ''
        let elements = [];

        if (type == 'P') { //Player
            person = 'You';
            classes = 'fight-left';
            elements.push(
                <IconSwordEmblem style={{ width: '25px', height: '25px', marginRight: '5px' }}/>
            );
            elements.push(stats?.power);
        } else {
            // Enemy
            person = 'Enemy';
            classes = 'fight-right';
            elements.push(stats?.power);
            elements.push(
                <IconSwordEmblem style={{ width: '25px', height: '25px', marginLeft: '5px' }}/>
            );
        }

        const healthBarMax = Utilities.roundTo0Decimal(stats?.power || 0);
        const healthBarValue = stats?.health;

        return (
            <div style={{ textAlign: 'center' }}>
                { person }
                <div>
                    <span className={classes}>
                        { elements }
                    </span>
                </div>
                <div>
                    <progress className="health-bar" style={{ width: '100%' }} 
                    value={ healthBarValue } max={ healthBarMax } />
                    <label style={{
                        position: 'relative',
                        textAlign: 'center',
                        top: -18
                    }}>
                        { healthBarValue }
                    </label>
                </div>
            </div>
        );
    }

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
                        <span>
                            { zone?.minPowerReq }
                            <IconSwordEmblem style={{ width: '25px', height: '25px', marginLeft: '5px' }}/>
                        </span>
                    </div>
                </div>

                <div className="zone-fight-header zone-header">
                    { Button('Retreat', 
                        ExplorationController.doClickRetreatFromZone.bind(ExplorationController),
                        'zone-button-retreat', 
                        {
                            /* no custom style */
                        }
                        )}
                    <label className="zone-size">
                        { zone?.currProgress + '/' + zone?.zoneSize }
                    </label>
                </div>

                <div style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 150px 1fr'
                }}>
                    { CharHealthStats('P', zoneCharacterStats) }
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconCrossedSwords style={{ width: '25px', height: '25px' }}/>
                    </div>
                    { CharHealthStats('E', zoneEnemyStats) }
                </div>
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