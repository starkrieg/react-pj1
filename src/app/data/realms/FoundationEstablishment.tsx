'use client'

import { BaseAttributes } from "../BaseAttributes";
import { RealmController } from "./RealmController";
import { Realm } from "./Realm";

export class FoundationEstablishment extends Realm {

    stage: string;

    constructor(stage: string = 'early') {
        const id = 'foundation-establishment-' + stage
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

        const requirements = new BaseAttributes(reqQi, reqBody);

        super(id, title, requirements, [], desc);

        this.stage = stage;

        this.setupRealmUpMultipliers();
    }

    private setupRealmUpMultipliers() {
        const breakthroughMultipliers = [];

        switch (this.stage) {
            case 'early':
                const earlyQiCapBonus = 1500
                breakthroughMultipliers.push(this.createRealmMultiplier('qi-capacity', 'sum', earlyQiCapBonus));
                breakthroughMultipliers.push(this.createRealmMultiplier('body-capacity', 'sum', 100));
                break;
            case 'middle':
                const middleQiCapBonus = 1500
                breakthroughMultipliers.push(this.createRealmMultiplier('qi-capacity', 'sum', middleQiCapBonus));
                breakthroughMultipliers.push(this.createRealmMultiplier('body-capacity', 'sum', 100));
                breakthroughMultipliers.push(this.createRealmMultiplier('lifespan', 'sum', 10));
                break;
            case 'late':
                const lateQiCapBonus = 2
                breakthroughMultipliers.push(this.createRealmMultiplier('qi-capacity', 'multi', lateQiCapBonus));
                breakthroughMultipliers.push(this.createRealmMultiplier('body-capacity', 'sum', 200));
                breakthroughMultipliers.push(this.createRealmMultiplier('lifespan', 'sum', 20));
                break;
            default:
                break;
        }

        this.breakMultipliers = breakthroughMultipliers;
    }

    getNextRealm() {
        switch (this.stage) {
            case 'early':
                return RealmController.getRealmById('foundation-establishment-middle');
            case 'middle':
                return RealmController.getRealmById('foundation-establishment-late');
            case 'late':
            default:
                return RealmController.getRealmById('unknown');
        }        
    }

}