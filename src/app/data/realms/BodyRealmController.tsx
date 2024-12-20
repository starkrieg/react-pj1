'use client'

import { BodyRealmEnum } from "./body/BodyRealmEnum";
import { BodyRefiningGeneric } from "./body/BodyRefiningGeneric";
import { BaseBodyRealm } from "./body/BaseBodyRealm";
import { MortalBodyRealm } from "./body/MortalBodyRealm";

export class BodyRealmController {

    static realmMatrix = new Map<BodyRealmEnum, BaseBodyRealm>();

    private static createAndReturnUnknownRealm() {
        const unknownRealm = new BaseBodyRealm(BodyRealmEnum.UNKNOWN, [], []);
        this.realmMatrix.set(BodyRealmEnum.UNKNOWN, unknownRealm);
        return unknownRealm;
    }

    private static createAndReturnMortalRealm() {
        this.realmMatrix.set(BodyRealmEnum.MORTAL, new MortalBodyRealm());
        return this.realmMatrix.get(BodyRealmEnum.MORTAL);
    }

    private static createAndReturnBodyRefineRealm(realmId: BodyRealmEnum) {
        this.realmMatrix.set(realmId, new BodyRefiningGeneric(realmId));
        return this.realmMatrix.get(realmId);

    }

    private static createRealmFromRealmId(realmId: BodyRealmEnum) : BaseBodyRealm | undefined {
        switch (realmId) {
            case BodyRealmEnum.UNKNOWN:
                return this.createAndReturnUnknownRealm();
            case BodyRealmEnum.MORTAL:
                return this.createAndReturnMortalRealm();
            case BodyRealmEnum.REFINE_BODY_1:
            case BodyRealmEnum.REFINE_BODY_2:
            case BodyRealmEnum.REFINE_BODY_3:
            case BodyRealmEnum.REFINE_BODY_4:
            case BodyRealmEnum.REFINE_BODY_5:
            case BodyRealmEnum.REFINE_BODY_6:
            case BodyRealmEnum.REFINE_BODY_7:
            case BodyRealmEnum.REFINE_BODY_8:
            case BodyRealmEnum.REFINE_BODY_9:
                return this.createAndReturnBodyRefineRealm(realmId);
            default:
                return undefined;
        }
    }

    /*
        return a realm instance based on realm id passed
    */
    static getRealmById(realmId: BodyRealmEnum) : BaseBodyRealm {
        const realm = this.realmMatrix.get(realmId) || this.createRealmFromRealmId(realmId);
        return realm || this.createAndReturnUnknownRealm()
    }
}