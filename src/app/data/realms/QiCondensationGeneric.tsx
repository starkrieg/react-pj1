'use client'

import { BaseAttributes } from "../BaseAttributes";
import { RealmController } from "./RealmController";
import { Realm } from "./Realm";

export class QiCondensationGeneric extends Realm {

    stage: number;

    constructor(stage: number = 0) {
        const id = 'qi-condensation-' + stage;
        const title = 'Qi Condensation ' + stage;
        const desc = `
        You are barely a new born chick.
        Absorb Qi from the natural world and refine it inside the body for higher strength.
        `;

        const reqQi = stage * 100;
        const reqBody = 50 + (stage * 50);
        const requirements = new BaseAttributes(reqQi, reqBody);

        super(id, title, requirements, [], desc);

        this.stage = stage;

        this.setupRealmUpMultipliers();
    }

    private setupRealmUpMultipliers() {
        const breakthroughMultipliers = [];

        // qi capacity bonus is 100 for stages 1 and 2
        if (this.stage < 6) {
            const qiCapBonus = ([3,4,5].includes(this.stage)) ? 200 : 100;
            breakthroughMultipliers.push(this.createRealmMultiplier('qi-capacity', 'sum', qiCapBonus));
        }

        if (this.stage == 6) {
            //stage 6 goes to Foundation Establishment
            //qi capacity is doubled
            breakthroughMultipliers.push(this.createRealmMultiplier('qi-capacity', 'multi', 2));
        }
        // body capacity bonus starts big and lowers with upper stages
        const bodyCapBonus = 100 - ((this.stage) * 10);
        breakthroughMultipliers.push(this.createRealmMultiplier('body-capacity', 'sum', bodyCapBonus));
        
        // lifespan increase for stage 3 breaking to 4
        if (this.stage == 3) {
            const lifespanBonus = 10;
            breakthroughMultipliers.push(this.createRealmMultiplier('lifespan', 'sum', lifespanBonus));
        }

        // lifespan increase for stage 6 to realm up
        if (this.stage == 6) {
            const lifespanBonus = 20;
            breakthroughMultipliers.push(this.createRealmMultiplier('lifespan', 'sum', lifespanBonus));
        }

        this.breakMultipliers = breakthroughMultipliers;
    }

    getNextRealm() {
        if (this.stage < 6) {
            const nextStage = this.stage + 1;
            return RealmController.getRealmById('qi-condensation-' + nextStage);            
        }
        if (this.stage == 6) {
            return RealmController.getRealmById('foundation-establishment-early');            
        }
        return RealmController.getRealmById('unknown');
    }

}