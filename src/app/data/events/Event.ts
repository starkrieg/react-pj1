import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { EventMilestone } from "./EventMilestone";

export class Event {

    //from the event start, to inbetween plots and end
    eventMilestones: EventMilestone[];

    //which zone must be beaten to interrupt the event
    endZone: ZoneIdEnum;

    //message displayed when event is interrupted
    interruptEventMessage: string;

    //message displayed when end zone is beaten after last milestone
    afterEndMessage: string;

    nextMilestoneIndex: number = 0;

    isInterrupted: boolean = false;
    isFinished: boolean = false;

    constructor(eventMilestones: EventMilestone[],
        endZone: ZoneIdEnum, interruptMessage: string,
        afterEndMessage: string
    ) {
        this.eventMilestones = eventMilestones;
        this.endZone = endZone;
        this.interruptEventMessage = interruptMessage;
        this.afterEndMessage = afterEndMessage;        
    }

    getNextMilestoneYear() : number {
        if (this.isFinished || this.isInterrupted) {
            return -1; //last milestone already occured
        } else {
            const nextMilestone = this.eventMilestones[this.nextMilestoneIndex];
            return nextMilestone.year;
        }
    }

    getNextMilestone() {
        return this.eventMilestones[this.nextMilestoneIndex];
    }

    doMoveMilestone() {
        this.nextMilestoneIndex += 1;
        if (this.nextMilestoneIndex >= this.eventMilestones.length) {
            this.isFinished = true;
        }
    }

    doFinishEventGetMessage() : string {
        if (this.isFinished) {
            return this.afterEndMessage;
        } else {
            this.isInterrupted = true;
            return this.interruptEventMessage;
        }
    }

}