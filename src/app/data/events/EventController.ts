import { ActivitiesController } from "../activities/ActivitiesController";
import { ExplorationController } from "../exploration/ExplorationController";
import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { MarketController } from "../market/MarketController";
import { MessageController } from "../messages/MessageController";
import { Event } from "./Event";

export class EventController {

    private static eventList: Event[] = [];

    //which year has the closest milestone from all events
    private static nextMilestoneYear: number = -1;

    //which zones are related to event end zones and must be observed
    private static observedEndZones: Set<ZoneIdEnum> = new Set<ZoneIdEnum>();

    static reset() {
        this.eventList = [];
        this.nextMilestoneYear = -1;
    }

    /**
     * Adds the event object to the list
     * @param event event content data
     */
    static addEvent(event: Event) {
        this.eventList.push(event);
        this.updateNextMilestoneYear();
        this.updateObservedEndZones();
    }

    /**
     * Update internal pointer to which year is the soonest milestone
     */
    private static updateNextMilestoneYear() {
        const validMilestones = this.eventList
            .map(evt => evt.getNextMilestoneYear())
            .filter(year => year > -1);

        if (validMilestones.length > 0) {
            this.nextMilestoneYear = validMilestones.sort()[0];
        } else {
            this.nextMilestoneYear = -1;
        }
    }

    private static updateObservedEndZones() {
        this.observedEndZones.clear();
        this.eventList
            .filter(evt => evt.getNextMilestoneYear() > -1)
            .map(evt => evt.endZone)
            .forEach(
                endZone => this.observedEndZones.add(endZone)
            );
    }

    /**
     * The year of the soonest event milestone
     * @returns a number
     */
    static getNextMilestoneYear() : Readonly<number> {
        return this.nextMilestoneYear;
    }

    static doEventMilestone() {
        this.eventList.filter(evt => evt.getNextMilestoneYear() == this.nextMilestoneYear)
            .forEach(evt => {
                const milestone = evt.getNextMilestone();
                MessageController.pushMessageEvent(milestone.message);
                if (milestone.difficultyIncreasePercent > 0 
                    && milestone.zonesDifficultyAffected.length > 0) {
                    milestone.zonesDifficultyAffected.forEach(zoneId => {
                        ExplorationController.addZoneDifficulty(zoneId, milestone.difficultyIncreasePercent);
                    });
                }
                milestone.regionsBlocked.forEach(regionId => {
                    ExplorationController.addBlockRegion(regionId);
                    MarketController.addBlockRegion(regionId);
                    ActivitiesController.updateActivities();
                });
                evt.doMoveMilestone();
        });
        this.updateNextMilestoneYear();
        this.updateObservedEndZones();
    }

    static isZoneObserved(zoneId: ZoneIdEnum) {
        return this.observedEndZones.has(zoneId);
    }

    static finishEventsByZone(zoneId: ZoneIdEnum) {
        this.eventList
            .filter(evt => evt.getNextMilestoneYear() > -1
                && evt.endZone == zoneId)
            .forEach(evt => {
                const eventMessage = evt.doFinishEventGetMessage();
                MessageController.pushMessageEvent(eventMessage);
            });
    }

}