import { Calendar } from "./Calendar";
import { Character } from "./Character";

export default class CalendarPanel {

    private roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    createCalendarPanel(calendar: Calendar, 
        character: Character, 
        selectedActivity = 'Nothing') {

        const qiCapPercent = this.roundTo2Decimal(character.getQiCapPercent());

        return (
            <div id="calendar-panel">
                <p>{calendar.year}, month {calendar.month}</p>
                <p>{character.year}y, {character.month} month (max {character.maxAge}y)</p>
                <p>{character.realm}</p>
                <p>Doing: {selectedActivity}</p>
                <p>Coins: {this.roundTo2Decimal(character.money)}</p>
                <p>Qi: {this.roundTo2Decimal(character.qi)} ({qiCapPercent}%)</p>
                <p>Body: {this.roundTo2Decimal(character.body)}</p>
            </div>
        );
    }

}