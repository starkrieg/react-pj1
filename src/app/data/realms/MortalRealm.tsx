'use client'

import { BaseAttributes } from "../BaseAttributes";
import { RealmController } from "./RealmController";
import { Realm } from "./Realm";

export class MortalRealm extends Realm {

    constructor() {
        const id = 'mortal';
        const title = 'Mortal'
        const desc = `
        You are but a common person. 
        Your death is certain and your power is zero.
        What will you do?`;

        const reqQi = 0;
        const reqBody = 0;
        const requirements = new BaseAttributes(reqQi, reqBody);

        super(id, title, requirements, [], desc);

        this.setupRealmUpMultipliers();
    }

    private setupRealmUpMultipliers() {
        const breakthroughMultipliers = [];

        const qiCapBonus = 100;
        const bodyCapBonus = 100;
        const lifespanBonus = 10;

        breakthroughMultipliers.push(this.createRealmMultiplier('qi-capacity', 'sum', qiCapBonus));
        breakthroughMultipliers.push(this.createRealmMultiplier('body-capacity', 'sum', bodyCapBonus));
        breakthroughMultipliers.push(this.createRealmMultiplier('lifespan', 'sum', lifespanBonus));

        this.breakMultipliers = breakthroughMultipliers;
    }

    getNextRealm() {
        return RealmController.getRealmById('qi-condensation-1');
    }

}