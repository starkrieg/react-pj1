
export default class CalendarPanel {

    createCalendarPanel(calendar = {}, 
        character = {}, 
        selectedActivity = 'Nothing') {
        const innerCalendarData = {
            year: calendar?.year || 600,
            month: calendar?.month || 1,
            charAgeYear: character?.year || 16,
            charAgeMonth: character?.month || 1,
            charRealm: character?.realm || 'Unknown',
            money: character.money || 0
        };

        return (
            <div id="calendar-panel">
            <p>{innerCalendarData.year}, month {innerCalendarData.month}</p>
            <p>{innerCalendarData.charAgeYear}y, {innerCalendarData.charAgeMonth} month</p>
            <p>{innerCalendarData.charRealm}</p>
            <p>Doing: {selectedActivity}</p>
            <p>Money: {innerCalendarData.money}</p>
            </div>
        );
    }

}