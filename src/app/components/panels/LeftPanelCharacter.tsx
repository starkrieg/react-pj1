'use client'

import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { CharacterController } from "@/app/data/character/CharacterController";
import { Utilities } from "@/app/data/utils/Utilities";
import { ExperienceBar } from "../ColoredBar";
import { AttributeTypeEnum } from "@/app/data/character/AttributeTypeEnum";
import { EnergyRealmVO } from "@/app/data/realms/energy/EnergyRealmVO";
import { BodyRealmVO } from "@/app/data/realms/body/BodyRealmVO";
import { CoinPouchLabel } from "../Coins";



export default function LeftPanelCharacter() {

    const character = CharacterController.getCharacter()

    function Qi() {
        const isShowRealmFoundation = CharacterController.isHaveItem(ItemIdEnum.BOOK_PERFECT_QI_CONDENSATION);
        const qiCapPercent = isShowRealmFoundation 
            ? `(${Utilities.roundTo2Decimal(character.getQiCapPercent() * 100)}%)`
            : '';
    
        return (
          <label>Qi: {Utilities.toScientificFormat(character.getQi())} {qiCapPercent}</label>
        );
    }

    function Body() {
        return (
            <label>Body: {character.getBody()} {bodyCapPercent}</label>
        );
    }

    function DeathCount() {
        return (
            <label>Deaths: { Utilities.toScientificFormat(CharacterController.getDeathCount()) }</label>
        );
    }

    function Power() {
        return (
            <label>Power: { Utilities.toScientificFormat(CharacterController.getFightingPower()) }</label>
        );
    }

    function Health() {
        return (
            <label>Health: { Utilities.toScientificFormat(CharacterController.getHealth()) }</label>
        );
    }

    function LevelStatus() {
        const fightingStatus = CharacterController.getFightingStatus();
        const value = Utilities.roundTo2Decimal(fightingStatus[0]);
        const maxValue = Utilities.roundTo0Decimal(fightingStatus[1]);

        return (
            <div style={{ textAlign: 'center', margin: '5px 0px' }}>
                <label>Level: { CharacterController.getFightingLevel() } </label>
                {ExperienceBar(value, maxValue)}
            </div>
        );
    }

    function InternalInjury() {
        const injuryValue = Utilities.roundTo2Decimal( character.getAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE) );
        return (
            <label>Internal Injury: { injuryValue }%</label>
        );
    }

    function BodyRealmTitle() {
        return (
            <div>
                {bodyRealmVO.title}
            </div>
        );
    }

    function EnergyRealmTitle() {
        return (
            <div>
                {energyRealmVO.title}
            </div>
        );
    }

    function CharacterRealm() {
        return (
            <div style={{ marginTop: '5px' }}>
                { EnergyRealmTitle() }
                { isBodyCultivationUnlocked && BodyRealmTitle() }
            </div>
        );
    }

    const energyRealmVO = new EnergyRealmVO(character.energyRealm.id);
    const bodyRealmVO = new BodyRealmVO(character.bodyRealm.id);
    const isBodyCultivationUnlocked = CharacterController.isHaveItem(ItemIdEnum.BOOK_BODY_CULTIVATION);

    const isShowQiLabel = CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION);

    const bodyCapPercent = isBodyCultivationUnlocked ? '('
        + Utilities.roundTo2Decimal(character.getBodyCapPercent() * 100)
        + '%)'
        : '';

    const isShowDeath = CharacterController.getDeathCount() > 0;

    const isShowInternalInjury = character.getAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE) > 0;

    const characterLifeSpan = character.getAttributeValue(AttributeTypeEnum.LIFESPAN);

    const characterPotential = Utilities.roundTo2Decimal(character.getAgeGainModifier()*100);

    const coins = Utilities.roundTo2Decimal(character.getAttributeValue(AttributeTypeEnum.COIN));

    const coinLabel = <div className={ 'coin-label' }>
            <label>Coins: </label>{ CoinPouchLabel(coins) }
        </div>

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            { LevelStatus() }
            { CharacterRealm() }
            <label style={{ marginTop: '5px' }}>{character.year}y (max {characterLifeSpan}y)</label>
            <label style={{ marginBottom: '5px' }}>Potential: {characterPotential}%</label>
            { Health() }
            { Power() }
            { Body() }
            { isShowQiLabel && Qi() }
            { isShowInternalInjury && InternalInjury() }
            { coinLabel }
            { isShowDeath && DeathCount() }
        </div>
    );

}