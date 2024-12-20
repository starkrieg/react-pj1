'use client'

import { FoundationEstablishment } from "./energy/FoundationEstablishment";
import { MortalEnergyRealm } from "./energy/MortalEnergyRealm";
import { QiCondensationGeneric } from "./energy/QiCondensationGeneric";
import { EnergyRealmEnum } from "./energy/EnergyRealmEnum";
import { BaseEnergyRealm } from "./energy/BaseEnergyRealm";

export class EnergyRealmController {

    static realmMatrix = new Map<EnergyRealmEnum, BaseEnergyRealm>();

    private static createAndReturnUnknownRealm() {
        const unknownRealm = new BaseEnergyRealm(EnergyRealmEnum.UNKNOWN, [], []);
        this.realmMatrix.set(EnergyRealmEnum.UNKNOWN, unknownRealm);
        return unknownRealm;
    }

    private static createAndReturnMortalRealm() {
        this.realmMatrix.set(EnergyRealmEnum.MORTAL, new MortalEnergyRealm());
        return this.realmMatrix.get(EnergyRealmEnum.MORTAL);
    }

    private static createAndReturnQiCondensation(realmId: EnergyRealmEnum) {
        this.realmMatrix.set(realmId, new QiCondensationGeneric(realmId));
        return this.realmMatrix.get(realmId);

    }

    private static createAndReturnFoundationEstablishment(realmId: EnergyRealmEnum) {
        const qiCondRealm = new FoundationEstablishment(realmId);
        this.realmMatrix.set(realmId, qiCondRealm);
        return this.realmMatrix.get(realmId);

    }    

    private static createRealmFromRealmId(realmId: EnergyRealmEnum) : BaseEnergyRealm | undefined {
        switch (realmId) {
            case EnergyRealmEnum.MORTAL:
                return this.createAndReturnMortalRealm();
            case EnergyRealmEnum.QI_CONDENSATION_1:
            case EnergyRealmEnum.QI_CONDENSATION_2:
            case EnergyRealmEnum.QI_CONDENSATION_3:
            case EnergyRealmEnum.QI_CONDENSATION_4:
            case EnergyRealmEnum.QI_CONDENSATION_5:
            case EnergyRealmEnum.QI_CONDENSATION_6:
            case EnergyRealmEnum.QI_CONDENSATION_7:
            case EnergyRealmEnum.QI_CONDENSATION_8:
            case EnergyRealmEnum.QI_CONDENSATION_9:
                return this.createAndReturnQiCondensation(realmId);
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY:
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_MIDDLE:
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_LATE:
                return this.createAndReturnFoundationEstablishment(realmId);
            default:
                return undefined;
        }
    }

    /*
        return a realm instance based on realm id passed
    */
    static getRealmById(realmId: EnergyRealmEnum) : BaseEnergyRealm {
        const realm = this.realmMatrix.get(realmId) || this.createRealmFromRealmId(realmId);
        return realm || this.createAndReturnUnknownRealm()
    }
}