'use client'

import { RealmController } from "./RealmController";
import { Realm } from "./Realm";
import { RealmEnum } from "./RealmEnum";
import { Attribute } from "../character/Attribute";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { CharacterController } from "../character/CharacterController";

export class QiCondensationGeneric extends Realm {

    stage: number;

    constructor(realmId: RealmEnum) {
        // assuming realm id for Qi Condensations is always qi-condensation-n
        const stage: number = Number(realmId.split('-')[2])

        const title = 'Qi Condensation ' + stage;
        const desc = `
        You are barely a new born chick.
        Absorb Qi from the natural world and refine it inside the body for higher strength.
        `;

        const reqQi = stage * 100;
        const reqBody = 50 + (stage * 50);
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

        // qi capacity bonus is 100 for stages 1 and 2
        if (this.stage < 6) {
            const qiCapBonus = ([3,4,5].includes(this.stage)) ? 200 : 100;
            breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.QI_BASE_CAPACITY, 'sum', qiCapBonus));
            // TODO - make character attributes and multipliers into abstract classes, so any attribute or multiplier can be modified by realms
        }

        if (this.stage == 6) {
            //stage 6 goes to Foundation Establishment
            //qi capacity is doubled
            breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.QI_BASE_CAPACITY, 'multi', 2));
        }
        // body capacity bonus starts big and lowers with upper stages
        const bodyCapBonus = 100 - ((this.stage) * 10);
        breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.BODY_CAPACITY, 'sum', bodyCapBonus));
        
        // lifespan increase for stage 3 breaking to 4
        if (this.stage == 3) {
            const lifespanBonus = 10;
            breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.LIFESPAN, 'sum', lifespanBonus));
        }

        // lifespan increase for stage 6 to realm up
        if (this.stage == 6) {
            const lifespanBonus = 20;
            breakthroughMultipliers.push(this.createRealmMultiplier(AttributeTypeEnum.LIFESPAN, 'sum', lifespanBonus));
        }

        this.breakMultipliers = breakthroughMultipliers;
    }

    getNextRealm() {
        if (this.stage < 6) {
            const nextStage = this.stage + 1;
            switch (nextStage) {
                case 2:
                    return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_2);
                case 3:
                    return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_3);
                case 4:
                    return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_4);
                case 5:
                    return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_5);
                case 6:
                    return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_6);
            }
            return RealmController.getRealmById(RealmEnum.UNKNOWN);
        }
        if (this.stage >= 6) {
            const perfection = CharacterController.getCharacter()
                .getAttributeValue(AttributeTypeEnum.PERFECTION);
            if (perfection >= 6) {
                switch (perfection) {
                    case 6:
                        return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_7);
                    case 7:
                        return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_8);
                    case 8:
                        return RealmController.getRealmById(RealmEnum.QI_CONDENSATION_9);
                    case 9:
                        return RealmController.getRealmById(RealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                }
            } else {
                return RealmController.getRealmById(RealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
            }
        }
        return RealmController.getRealmById(RealmEnum.UNKNOWN);
    }

}