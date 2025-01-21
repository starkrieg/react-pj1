'use client'

import Button from "../Button";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";
import IconCrossedSwords from '../../assets/icons/crossed-swords.svg';
import IconSwordEmblem from '../../assets/icons/swords-emblem.svg';
import { Utilities } from "@/app/data/utils/Utilities";
import { HealthBar } from "../ColoredBar";
import { CharacterController } from "@/app/data/character/CharacterController";

export default function ExplorableZoneProgressPanel() {

    //only selected zone is shown
    const zone = ExplorationController.getSelectedZone();

    //if no character fight stats, then setup it up
    if (!ExplorationController.getFightScene()) {
        ExplorationController.createFightScene();
    }

    function ZoneCompleteMarker() {
        return (
            <span className="zone-checked" />
        )
    }

    function CharHealthStats() {
        const elements = [];
        const person = 'You';
        const classes = 'fight-left';
        
        elements.push(
            <IconSwordEmblem style={{ width: '25px', height: '25px', marginRight: '5px' }}/>
        );
        elements.push(Utilities.toScientificFormat(CharacterController.getCharacterPower() || 0));

        const healthBarMax = CharacterController.getHealth()!;    
        const healthBarValue = Utilities.roundTo2Decimal(
            ExplorationController.getFightScene()?.characterCurrentHealth || 0);

        return (
            <div style={{ textAlign: 'center' }}>
                { person }
                <div>
                    <span className={classes}>
                        { elements }
                    </span>
                </div>
                { HealthBar(healthBarValue, healthBarMax) }
            </div>
        );
    }

    function EnemyHealthStats() {
        const zoneEnemyStats = ExplorationController.getFightScene()?.enemy;
        const elements = [];

        // Enemy
        const person = zoneEnemyStats?.name;
        const classes = 'fight-right';
        elements.push(Utilities.toScientificFormat(zoneEnemyStats?.power || 0));
        elements.push(
            <IconSwordEmblem style={{ width: '25px', height: '25px', marginLeft: '5px' }}/>
        );

        const healthBarMax = Utilities.roundTo2Decimal(zoneEnemyStats?.power || 0);
        const healthBarValue = Utilities.roundTo2Decimal(zoneEnemyStats?.health || 0);

        return (
            <div style={{ textAlign: 'center' }}>
                { person }
                <div>
                    <span className={classes}>
                        { elements }
                    </span>
                </div>
                { HealthBar(healthBarValue, healthBarMax) }
            </div>
        );
    }

    return (
        <div style={ { display: '' } } className={ 'zones' }>
            <div className="zone-selected item-style">
                <div className="zone-header">
                    <label>{ zone?.title }</label>
                    <div className="zone-complete">
                        { zone?.isComplete && ZoneCompleteMarker() }
                    </div>                
                </div>

                <div className="zone-header">
                    <div className="zone-desc">        
                        <span>{ zone?.desc }</span>
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
                    gridTemplateColumns: '1fr 150px 1fr',
                    margin: '2px 0px'
                }}>
                    { CharHealthStats() }
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconCrossedSwords style={{ width: '25px', height: '25px' }}/>
                    </div>
                    { EnemyHealthStats() }
                </div>
            </div>
        </div>
    );

}
