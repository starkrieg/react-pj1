'use client'

import { Character } from "@/app/data/Character";
import { Calendar } from "../../data/Calendar";
import { ActivitiesEnum } from "@/app/data/activities/ActivitiesEnum";

export default function CalendarPanel(calendar: Calendar, 
        character: Character, 
        selectedActivity = ActivitiesEnum.NOTHING) {

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

    const qiLabel = character.getUnlockStatus('qi-cultivation') ? 
        createQiLabel(character) 
        : '';

    const bodyCapPercent = character.getUnlockStatus('show-foundation') ? '('
        + roundTo2Decimal(character.getBodyCapPercent() * 100)
        + '%)'
        : '';

    return (
        <div id="calendar-panel">
            <p>{calendar.year}y, day {calendar.day}</p>
            <p>{character.year}y (max {character.maxAge}y)</p>
            <p>{character.realm?.title}</p>
            <p>Doing: {selectedActivity}</p>
            <p>Coins: {roundTo2Decimal(character.money)}</p>
            {qiLabel}
            <p>Body: {roundTo2Decimal(character.getBody())} {bodyCapPercent}</p>
        </div>
    );

}