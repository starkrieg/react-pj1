'use client'

import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { BaseRealmVO } from "../common/BaseRealmVO";
import { EnergyRealmEnum } from "./EnergyRealmEnum";

export class EnergyRealmVO implements BaseRealmVO {

    title: string;
    desc: string;
    type: AttributeTypeEnum = AttributeTypeEnum.QI

    constructor(realmId: EnergyRealmEnum) {
        switch (realmId) {
            case EnergyRealmEnum.MORTAL:
                this.title = 'Mortal';
                this.desc = 'A regular human with limited potential';
                break;
            case EnergyRealmEnum.QI_CONDENSATION_1:
            case EnergyRealmEnum.QI_CONDENSATION_2:
            case EnergyRealmEnum.QI_CONDENSATION_3:
            case EnergyRealmEnum.QI_CONDENSATION_4:
            case EnergyRealmEnum.QI_CONDENSATION_5:
            case EnergyRealmEnum.QI_CONDENSATION_6:
            case EnergyRealmEnum.QI_CONDENSATION_7:
            case EnergyRealmEnum.QI_CONDENSATION_8:
            case EnergyRealmEnum.QI_CONDENSATION_9:
                this.title = this.getQiCondensationTitle(realmId);
                this.desc = `
                    You are barely a new born chick. 
                    Absorb Qi from the world and reach for greater strength.
                    `;
                break;
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY:
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_MIDDLE:
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_LATE:
                this.title = this.getFoundationEstablishmentTitle(realmId);
                this.desc = `
                    Still building a foundation, too early on the journey.
                    Absorb more Qi and solidify your roots.
                    `;
                break;
            case EnergyRealmEnum.UNKNOWN:
            default:
                this.title = 'Unknown';
                this.desc = 'You have yet to understand what is this realm';
                break;
        }
    }

    private getQiCondensationTitle(realmId: EnergyRealmEnum) {
        const stage: number = Number(realmId.split('-')[2]);
        return `Qi Condensation ${stage}`;
    }

    private getFoundationEstablishmentTitle(realmId: EnergyRealmEnum) {
        const stage: string = realmId.substring('foundation-establishment-'.length);
        return stage.charAt(0).toUpperCase() + stage.slice(1) + ' Foundation Establishment';        
    }

}