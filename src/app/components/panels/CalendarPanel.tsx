'use client'

import { Calendar } from "../../data/Calendar";
import { ExploreZoneIdEnum } from "@/app/data/exploration/ExploreZoneIdEnum";
import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";
import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { CharacterController } from "@/app/data/character/CharacterController";

export default function CalendarPanel(calendar: Calendar) {

    const character = CharacterController.getCharacter()

    function createQiLabel() {
        const qiCapPercent = '('
        + roundTo2Decimal(character.getQiCapPercent() * 100)
        + '%)';
    
        return (
          <p>Qi: {roundTo2Decimal(character.getQi())} {qiCapPercent}</p>
        );
    }

    function DeathCount() {
        const death = CharacterController.getDeathCount() > 0 ? 
        <p>Deaths: {CharacterController.getDeathCount()}</p>
        : ''
        return (
            {death}
        );
    }

    function FightingPower() {
        const power = CharacterController.getFightingPower() > 0 ? 
        <p>Power: {CharacterController.getFightingPower()}</p>
        : ''
        return (
            {power}
        );
    }

    function roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    const qiLabel = CharacterController.isHaveItem(ItemIdEnum.QI_CULTIVATION_KNOWLEDGE) ? 
        createQiLabel() 
        : '';

    const bodyCapPercent = CharacterController.isHaveItem(ItemIdEnum.CULTIVATION_FOUNDATION_KNOWLEDGE) ? '('
        + roundTo2Decimal(character.getBodyCapPercent() * 100)
        + '%)'
        : '';

    const doing = ExplorationController.selectedZoneId == ExploreZoneIdEnum.NOTHING ?
        ActivitiesController.getSelectedActivityTitle()
        : ExplorationController.getSelectedExplorableZoneTitle()

    return (
        <div id="calendar-panel">
            <p>{calendar.year}y, day {calendar.day}</p>
            <p>{character.year}y (max {character.maxAge}y)</p>
            <p>{character.realm?.title}</p>
            <p>Doing: {doing}</p>
            <p>Coins: {roundTo2Decimal(character.money)}</p>
            {qiLabel}
            <p>Body: {roundTo2Decimal(character.getBody())} {bodyCapPercent}</p>
            {FightingPower()}
            {DeathCount()}
        </div>
    );

}