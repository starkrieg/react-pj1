'use client'

import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { CharacterController } from "@/app/data/character/CharacterController";
import { Utilities } from "@/app/data/utils/Utilities";
import { ExperienceBar } from "../ColoredBar";

export default function LeftPanelCharacter() {

    const character = CharacterController.getCharacter()

    function createQiLabel() {
        const qiCapPercent = '('
        + Utilities.roundTo2Decimal(character.getQiCapPercent() * 100)
        + '%)';
    
        return (
          <label>Qi: {Utilities.roundTo2Decimal(character.getQi())} {qiCapPercent}</label>
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

    function LevelStatus() {
        const fightingStatus = CharacterController.getFightingStatus();
        const value = fightingStatus[0];
        const maxValue = fightingStatus[1];
        
        return (
            <div style={{ textAlign: 'center', margin: '5px 0px' }}>
                <label>Level: { CharacterController.getFightingLevel() } </label>
                {ExperienceBar(value, maxValue)}
            </div>
        );
    }

    const isShowQiLabel = CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION);

    const bodyCapPercent = CharacterController.isHaveItem(ItemIdEnum.BOOK_BODY_REFINING) ? '('
        + Utilities.roundTo2Decimal(character.getBodyCapPercent() * 100)
        + '%)'
        : '';

    const isShowDeath = CharacterController.getDeathCount() > 0;

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            { LevelStatus() }
            <label>{character.realm?.title}</label>
            <label>Coins: {Utilities.roundTo2Decimal(character.money)}</label>
            <label>Body: {character.getBody()} {bodyCapPercent}</label>
            { isShowQiLabel && createQiLabel() }
            { FightingPower() }
            { isShowDeath && DeathCount() }
        </div>
    );

}