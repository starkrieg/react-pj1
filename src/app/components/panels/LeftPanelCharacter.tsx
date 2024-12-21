'use client'

import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { CharacterController } from "@/app/data/character/CharacterController";
import { Utilities } from "@/app/data/utils/Utilities";
import { ExperienceBar } from "../ColoredBar";
import { AttributeTypeEnum } from "@/app/data/character/AttributeTypeEnum";

export default function LeftPanelCharacter() {

    const character = CharacterController.getCharacter()

    function Qi() {
        const qiCapPercent = '('
        + Utilities.roundTo2Decimal(character.getQiCapPercent() * 100)
        + '%)';
    
        return (
          <label>Qi: {Utilities.roundTo2Decimal(character.getQi())} {qiCapPercent}</label>
        );
    }

    function Body() {
        return (
            <label>Body: {character.getBody()} {bodyCapPercent}</label>
        );
    }

    function DeathCount() {
        return (
            <label>Deaths: { CharacterController.getDeathCount() }</label>
        );
    }

    function FightingPower() {
        return (
            <label>Power: { CharacterController.getFightingPower() }</label>
        );
    }

    function Health() {
        return (
            <label>Health: { CharacterController.getHealth() }</label>
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

    function Coins() {
        const coins = Utilities.roundTo2Decimal(character.getAttributeValue(AttributeTypeEnum.COIN));
        return (
            <label>Coins: { coins }</label>
        );
    }

    function InternalInjury() {
        const injuryValue = Utilities.roundTo2Decimal( character.getAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE) );
        return (
            <label>Internal Injury: { injuryValue }%</label>
        );
    }

    const isShowQiLabel = CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION);

    const bodyCapPercent = CharacterController.isHaveItem(ItemIdEnum.BOOK_BODY_REFINING) ? '('
        + Utilities.roundTo2Decimal(character.getBodyCapPercent() * 100)
        + '%)'
        : '';

    const isShowDeath = CharacterController.getDeathCount() > 0;

    const isShowInternalInjury = character.getAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE) > 0;

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            { LevelStatus() }
            <label>{character.realm?.title}</label>
            { Health() }
            { FightingPower() }
            { Body() }
            { isShowQiLabel && Qi() }
            { isShowInternalInjury && InternalInjury() }
            { Coins() }
            { isShowDeath && DeathCount() }
        </div>
    );

}