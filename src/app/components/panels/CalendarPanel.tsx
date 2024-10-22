'use client'

import { Calendar } from "../Calendar";
import { Character } from "../Character";

export default class CalendarPanel {

    createQiLabel(character: Character) {
        const qiCapPercent = '('
        + this.roundTo2Decimal(character.getQiCapPercent() * 100)
        + '%)';
    
        return (
          <p>Qi: {this.roundTo2Decimal(character.getQi())} {qiCapPercent}</p>
        );
    }  

    private roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    createCalendarPanel(calendar: Calendar, 
        character: Character, 
        selectedActivity = 'Nothing') {

        const qiLabel = character.getUnlockStatus('qi-cultivation') ? 
            this.createQiLabel(character) 
            : '';

        const bodyCapPercent = character.getUnlockStatus('show-foundation') ? '('
            + this.roundTo2Decimal(character.getBodyCapPercent() * 100)
            + '%)'
            : '';

        return (
            <div id="calendar-panel">
                <p>{calendar.year}y, day {calendar.day}</p>
                <p>{character.year}y (max {character.maxAge}y)</p>
                <p>{character.realm.title}</p>
                <p>Doing: {selectedActivity}</p>
                <p>Coins: {this.roundTo2Decimal(character.money)}</p>
                {qiLabel}
                <p>Body: {this.roundTo2Decimal(character.getBody())} {bodyCapPercent}</p>
            </div>
        );
    }

}