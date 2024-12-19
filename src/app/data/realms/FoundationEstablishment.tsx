'use client'

import { RealmController } from "./RealmController";
import { Realm } from "./Realm";
import { RealmEnum } from "./RealmEnum";
import { Attribute } from "../character/Attribute";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";

export class FoundationEstablishment extends Realm {

    stage: string;

    constructor(realmId: RealmEnum) {
        // assuming Foundation Establishment id follows pattern of foundation-establishment-x
        const stage: string = realmId.substring('foundation-establishment-'.length);
        
        const title = stage.charAt(0).toUpperCase() + stage.slice(1) + ' Foundation Establishment';
        const desc = `
        Still building a foundation, too early on the journey.
        Absorb more Qi and solidify your roots.
        `;

        let reqQi = 0;
        let reqBody = 0;

        switch (stage) {
            case 'early':
                reqQi = 1000
                reqBody = 500
                break;
            case 'middle':
                reqQi = 2000
                break;
            case 'late':
                reqQi = 4000
                break;
            default:
                break;
        }

        const requirements = [
            new Attribute(AttributeTypeEnum.QI, reqQi),
            new Attribute(AttributeTypeEnum.BODY, reqBody)
        ];

        super(realmId, title, requirements, [], desc);

        this.stage = stage;

        this.setupRealmUpMultipliers();
    }

    private setupRealmUpMultipliers() {
        const breakthroughMultipliers = [];

        switch (this.stage) {
            case 'early':
                const earlyQiCapBonus = 1500
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.QI_CAPACITY, 'sum', earlyQiCapBonus));
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.BODY_CAPACITY, 'sum', 100));
                // TODO - make character attributes and multipliers into abstract classes, so any attribute or multiplier can be modified by realms
                break;
            case 'middle':
                const middleQiCapBonus = 1500
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.QI_CAPACITY, 'sum', middleQiCapBonus));
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.BODY_CAPACITY, 'sum', 100));
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.LIFESPAN, 'sum', 10));
                break;
            case 'late':
                const lateQiCapBonus = 2
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.QI_CAPACITY, 'multi', lateQiCapBonus));
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.BODY_CAPACITY, 'sum', 200));
                breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.LIFESPAN, 'sum', 20));
                break;
            default:
                break;
        }

        this.breakMultipliers = breakthroughMultipliers;
    }

    getNextRealm() {
        switch (this.stage) {
            case 'early':
                return RealmController.getRealmById(RealmEnum.FOUNDATION_ESTABLISHMENT_MIDDLE);
            case 'middle':
                return RealmController.getRealmById(RealmEnum.FOUNDATION_ESTABLISHMENT_LATE);
            case 'late':
                // TODO - increment realms after late foundation establishment
            default:
                return RealmController.getRealmById(RealmEnum.UNKNOWN);
        }        
    }

}