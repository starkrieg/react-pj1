'use client'

import { BaseAttributes } from "../BaseAttributes";
import { FoundationEstablishment } from "./FoundationEstablishment";
import { MortalRealm } from "./MortalRealm";
import { QiCondensationGeneric } from "./QiCondensationGeneric";
import { Realm } from "./Realm";

export class RealmController {

    static realmMatrix = new Map<string, Realm>();

    private static createAndReturnUnknown() {
        this.realmMatrix.set('unknown', new Realm('unknown', 'Unknown', 
            new BaseAttributes(-1, -1), [], 
            `Your current realm is not clear. 
            What heights have you reached?`
        ));
        return this.realmMatrix.get('unknown');
    }

    private static createAndReturnMortalRealm() {
        this.realmMatrix.set('mortal', new MortalRealm());
        return this.realmMatrix.get('mortal');
    }

    private static createAndReturnQiCondensation(realmId: string) {
        const realmNum = realmId.substring('qi-condensation-'.length);
        const qiCondRealm = new QiCondensationGeneric(Number(realmNum));
        this.realmMatrix.set(realmId, qiCondRealm);
        return this.realmMatrix.get(realmId);

    }

    private static createAndReturnFoundationEstablishment(realmId: string) {
        const realmStage = realmId.substring('foundation-establishment-'.length);
        const qiCondRealm = new FoundationEstablishment(realmStage);
        this.realmMatrix.set(realmId, qiCondRealm);
        return this.realmMatrix.get(realmId);

    }    

    /*
        return a realm instance based on realm id passed
    */
    static getRealmById(realmId: string) : Realm | undefined {
        if (realmId == 'mortal') {
            return this.realmMatrix.get('mortal') 
                || this.createAndReturnMortalRealm();
        }
        if (realmId.startsWith('qi-condensation-')) {
            return this.realmMatrix.get(realmId) 
                || this.createAndReturnQiCondensation(realmId);
        }
        if (realmId.startsWith('foundation-establishment-')) {
            return this.realmMatrix.get(realmId) 
                || this.createAndReturnFoundationEstablishment(realmId);
        }
        return this.realmMatrix.get('unknown') 
            || this.createAndReturnUnknown();
    }
}