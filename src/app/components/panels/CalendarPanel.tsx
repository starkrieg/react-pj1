'use client'

import { Character } from "@/app/data/character/Character";
import { Calendar } from "../../data/Calendar";
import { ExploreZoneEnum } from "@/app/data/exploration/ExploreZoneEnum";
import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";
import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";

export default function CalendarPanel(calendar: Calendar, 
        character: Character, 
        activitiesController: ActivitiesController,
        explorationController: ExplorationController
        ) {

    function createQiLabel(character: Character) {
        const qiCapPercent = '('
        + roundTo2Decimal(character.getQiCapPercent() * 100)
        + '%)';
    
        return (
          <p>Qi: {roundTo2Decimal(character.getQi())} {qiCapPercent}</p>
        );
    }  

    function roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    const qiLabel = character.isHaveItem(ItemIdEnum.QI_CULTIVATION_KNOWLEDGE) ? 
        createQiLabel(character) 
        : '';

    const bodyCapPercent = character.isHaveItem(ItemIdEnum.CULTIVATION_FOUNDATION_KNOWLEDGE) ? '('
        + roundTo2Decimal(character.getBodyCapPercent() * 100)
        + '%)'
        : '';

    const doing = explorationController.selectedZone == ExploreZoneEnum.NOTHING ?
        activitiesController.getSelectedActivityTitle()
        : explorationController.getSelectedExplorableZoneTitle()

    return (
        <div id="calendar-panel">
            <p>{calendar.year}y, day {calendar.day}</p>
            <p>{character.year}y (max {character.maxAge}y)</p>
            <p>{character.realm?.title}</p>
            <p>Doing: {doing}</p>
            <p>Coins: {roundTo2Decimal(character.money)}</p>
            {qiLabel}
            <p>Body: {roundTo2Decimal(character.getBody())} {bodyCapPercent}</p>
        </div>
    );

}