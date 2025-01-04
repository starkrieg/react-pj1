'use client'

import { EnergyRealmEnum } from "./EnergyRealmEnum";
import { BaseEnergyRealm } from "./BaseEnergyRealm";

export class MortalEnergyRealm extends BaseEnergyRealm {

    constructor() {
        super(EnergyRealmEnum.MORTAL, [], [], [EnergyRealmEnum.QI_CONDENSATION_1]);
    }

}