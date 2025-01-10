'use client'

import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { CharacterController } from "@/app/data/character/CharacterController";
import { Utilities } from "@/app/data/utils/Utilities";
import { ExperienceBar } from "../ColoredBar";
import { AttributeTypeEnum } from "@/app/data/character/AttributeTypeEnum";
import { EnergyRealmVO } from "@/app/data/realms/energy/EnergyRealmVO";
import { BodyRealmVO } from "@/app/data/realms/body/BodyRealmVO";
import { CoinPouchLabel } from "../Coins";
import { hideTooltip, showTooltip } from "../Tooltip";

function createDivTooltip(text: string) {
    const retElem = document.createElement('div');
    retElem.innerText = text
    return retElem
}

export default function LeftPanelCharacter() {

    const character = CharacterController.getCharacter()

    function Qi() {
        const isShowRealmFoundation = CharacterController.isHaveItem(ItemIdEnum.BOOK_PERFECT_QI_CONDENSATION);
        const qiCapPercent = isShowRealmFoundation 
            ? `(${Utilities.roundTo2Decimal(character.getQiCapPercent() * 100)}%)`
            : '';
        
        const tooltipText = createDivTooltip(`How much energy you have accumulated`)
        
    
        return (
            <div>
                <label
                    onMouseOver={ (event) => showTooltip(event, tooltipText) } 
                    onMouseLeave={ () => hideTooltip() }
                >Qi: {Utilities.toScientificFormat(character.getQi())} {qiCapPercent}</label>
            </div>
        );
    }

    function Body() {
        const tooltipText = createDivTooltip(`How physically strong and tough you are`)
        return (
            <div>
                <label
                    onMouseOver={ (event) => showTooltip(event, tooltipText) } 
                    onMouseLeave={ () => hideTooltip() }
                >Body: {character.getBody()} {bodyCapPercent}</label>
            </div>
        );
    }

    function DeathCount() {
        return (
            <label>Deaths: { Utilities.toScientificFormat(CharacterController.getDeathCount()) }</label>
        );
    }

    function Power() {
        const tooltipText = createDivTooltip(`Greatly affected by Qi, then Body`)
        return (
            <div>
                <label
                    onMouseOver={ (event) => showTooltip(event, tooltipText) } 
                    onMouseLeave={ () => hideTooltip() }
                >Power: { Utilities.toScientificFormat(CharacterController.getFightingPower()) }</label>
            </div>
        );
    }

    function Health() {
        const tooltipText = createDivTooltip(`Greatly affected by Body, then Qi`)
        return (
            <div>
            <label
                onMouseOver={ (event) => showTooltip(event, tooltipText) } 
                onMouseLeave={ () => hideTooltip() }
            >Health: { Utilities.toScientificFormat(CharacterController.getHealth()) }</label>
            </div>
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
        const tooltipText = createDivTooltip(`Damage to internal organs reduces Health and Power`)
        const injuryValue = Utilities.roundTo2Decimal( character.getAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE) );
        return (
            <div>
                <label
                    onMouseOver={ (event) => showTooltip(event, tooltipText) } 
                    onMouseLeave={ () => hideTooltip() }
                >Internal Injury: { injuryValue }%</label>
            </div>
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

    function Potential() {
        const characterPotential = Utilities.roundTo2Decimal(character.getAgeGainModifier()*100);
        const tooltipText = createDivTooltip(
        `Growth potential. After a certain age, you won't gain much from basic training.
        Decline starts at age: X
        `);
        return (
            <div>
                <label style={{ marginBottom: '5px' }}
                    onMouseOver={ (event) => showTooltip(event, tooltipText) } 
                    onMouseLeave={ () => hideTooltip() }
                >Potential: {characterPotential}%</label>
            </div>
        );
    }

    function Coins() {
        const coins = Utilities.roundTo2Decimal(character.getAttributeValue(AttributeTypeEnum.COIN));

        return (
            <div className={ 'coin-label' }>
                <label>Coins: </label>{ CoinPouchLabel(coins) }
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

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            { LevelStatus() }
            { CharacterRealm() }
            <label style={{ marginTop: '5px' }}>{character.year}y (max {characterLifeSpan}y)</label>
            { Potential() }
            { Health() }
            { Power() }
            { Body() }
            { isShowQiLabel && Qi() }
            { isShowInternalInjury && InternalInjury() }
            { Coins() }
            { isShowDeath && DeathCount() }
        </div>
    );

}