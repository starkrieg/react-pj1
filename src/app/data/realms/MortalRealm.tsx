'use client'

import { RealmController } from "./RealmController";
import { Realm } from "./Realm";
import { RealmEnum } from "./RealmEnum";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";

export class MortalRealm extends Realm {

    constructor() {
        const title = 'Mortal'
        const desc = `
        You are but a common person. 
        Your death is certain and your power is zero.
        What will you do?`;

        super(RealmEnum.MORTAL, title, [], [], desc);

        this.setupRealmUpMultipliers();
    }

    private setupRealmUpMultipliers() {
        const breakthroughMultipliers = [];

        const qiCapBonus = 100;
        const bodyCapBonus = 100;
        const lifespanBonus = 10;

        breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.QI_BASE_CAPACITY, 'sum', qiCapBonus));
        breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.BODY_CAPACITY, 'sum', bodyCapBonus));
        breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.LIFESPAN, 'sum', lifespanBonus));

        this.breakMultipliers = breakthroughMultipliers;
    }

    getNextRealm() {
        return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_1);
    }

}