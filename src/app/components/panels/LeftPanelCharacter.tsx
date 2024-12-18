'use client'

import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { CharacterController } from "@/app/data/character/CharacterController";
import { Utilities } from "@/app/data/utils/Utilities";

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

    function FightingStatus() {
        const fightingStatus = CharacterController.getFightingStatus();
        return (
            <div style={{ textAlign: 'center', margin: '5px 0px' }}>
                <label>Level: { CharacterController.getFightingLevel() } </label>
                <progress style={{ width: '100%' }}
                 value={ fightingStatus[0] } max={ fightingStatus[1] } />
            </div>
        );
    }

    const isShowQiLabel = CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION);

    const bodyCapPercent = CharacterController.isHaveItem(ItemIdEnum.BOOK_BODY_REFINING) ? '('
        + Utilities.roundTo2Decimal(character.getBodyCapPercent() * 100)
        + '%)'
        : '';

    const isShowFightInfo = CharacterController.getFightCount() > 0;

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            { isShowFightInfo && FightingStatus() }
            <label>{character.realm?.title}</label>
            <label>Coins: {Utilities.roundTo2Decimal(character.money)}</label>
            <label>Body: {character.getBody()} {bodyCapPercent}</label>
            { isShowQiLabel && createQiLabel() }
            { isShowFightInfo && FightingPower() }
            { CharacterController.getDeathCount() > 0 && DeathCount() }
        </div>
    );

}