'use client'

import { EnergyRealmController } from "../EnergyRealmController";
import { EnergyRealmEnum } from "./EnergyRealmEnum";
import { BaseEnergyRealm } from "./BaseEnergyRealm";

export class MortalEnergyRealm extends BaseEnergyRealm {

    constructor() {
        super(EnergyRealmEnum.MORTAL, [], []);
    }

    getNextRealm() {
        return EnergyRealmController.getRealmById(EnergyRealmEnum.QI_CONDENSATION_1);
    }

}