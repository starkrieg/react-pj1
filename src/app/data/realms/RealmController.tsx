'use client'

import { FoundationEstablishment } from "./FoundationEstablishment";
import { MortalRealm } from "./MortalRealm";
import { QiCondensationGeneric } from "./QiCondensationGeneric";
import { Realm } from "./Realm";
import { RealmEnum } from "./RealmEnum";

export class RealmController {

    static realmMatrix = new Map<RealmEnum, Realm>();

    private static createAndReturnUnknownRealm() {
        const unknownRealm = new Realm(RealmEnum.UNKNOWN, 
            'Unknown', [], [], 
            `Your current realm is not clear. 
            What heights have you reached?`
        );
        this.realmMatrix.set(RealmEnum.UNKNOWN, unknownRealm);
        return unknownRealm;
    }

    private static createAndReturnMortalRealm() {
        this.realmMatrix.set(RealmEnum.MORTAL, new MortalRealm());
        return this.realmMatrix.get(RealmEnum.MORTAL);
    }

    private static createAndReturnQiCondensation(realmId: RealmEnum) {
        this.realmMatrix.set(realmId, new QiCondensationGeneric(realmId));
        return this.realmMatrix.get(realmId);

    }

    private static createAndReturnFoundationEstablishment(realmId: RealmEnum) {
        const qiCondRealm = new FoundationEstablishment(realmId);
        this.realmMatrix.set(realmId, qiCondRealm);
        return this.realmMatrix.get(realmId);

    }    

    private static createRealmFromRealmId(realmId: RealmEnum) : Realm | undefined {
        switch (realmId) {
            case RealmEnum.UNKNOWN:
                return this.createAndReturnUnknownRealm();
            case RealmEnum.MORTAL:
                return this.createAndReturnMortalRealm();
            case RealmEnum.QI_CONDENSATION_1:
            case RealmEnum.QI_CONDENSATION_2:
            case RealmEnum.QI_CONDENSATION_3:
            case RealmEnum.QI_CONDENSATION_4:
            case RealmEnum.QI_CONDENSATION_5:
            case RealmEnum.QI_CONDENSATION_6:
            case RealmEnum.QI_CONDENSATION_7:
            case RealmEnum.QI_CONDENSATION_8:
            case RealmEnum.QI_CONDENSATION_9:
                return this.createAndReturnQiCondensation(realmId);
            case RealmEnum.FOUNDATION_ESTABLISHMENT_EARLY:
            case RealmEnum.FOUNDATION_ESTABLISHMENT_MIDDLE:
            case RealmEnum.FOUNDATION_ESTABLISHMENT_LATE:
                return this.createAndReturnFoundationEstablishment(realmId);
            default:
                return undefined;
        }
    }

    /*
        return a realm instance based on realm id passed
    */
    static getRealmById(realmId: RealmEnum) : Realm {
        const realm = this.realmMatrix.get(realmId) || this.createRealmFromRealmId(realmId);
        return realm || this.createAndReturnUnknownRealm()
    }
}