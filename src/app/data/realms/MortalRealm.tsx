'use client'

import { BaseAttributes } from "../character/BaseAttributes";
import { RealmController } from "./RealmController";
import { Realm } from "./Realm";
import { RealmEnum } from "./RealmEnum";

export class MortalRealm extends Realm {

    constructor() {
        const title = 'Mortal'
        const desc = `
        You are but a common person. 
        Your death is certain and your power is zero.
        What will you do?`;

        const reqQi = 0;
        const reqBody = 0;
        const requirements = new BaseAttributes(reqQi, reqBody);

        super(RealmEnum.MORTAL, title, requirements, [], desc);

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
        return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_1);
    }

}