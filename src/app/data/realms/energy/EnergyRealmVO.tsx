'use client'

import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { Utilities } from "../../utils/Utilities";
import { IBaseRealmVO } from "../common/IBaseRealmVO";
import { EnergyRealmController } from "../EnergyRealmController";
import { EnergyRealmEnum } from "./EnergyRealmEnum";

export class EnergyRealmVO implements IBaseRealmVO {

    id: EnergyRealmEnum;
    title: string;
    desc: string;
    type: AttributeTypeEnum = AttributeTypeEnum.QI
    isUnlocked: boolean;

    constructor(realmId: EnergyRealmEnum) {
        this.id = realmId;

        this.isUnlocked = EnergyRealmController.getRealmById(realmId).isUnlocked();
        
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
                this.title = this.getQiCondensationTitle();
                this.desc = `
                    You are barely a new born chick. 
                    Absorb Qi from the world and reach for greater strength.
                    `;
                break;
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY:
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_MIDDLE:
            case EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_LATE:
                this.title = this.getFoundationEstablishmentTitle();
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

    private getQiCondensationTitle() {
        const stage: number = Number(this.id.split('-')[2]);
        return `Qi Condensation ${stage}`;
    }

    private getFoundationEstablishmentTitle() {
        const stage: string = this.id.substring('foundation-establishment-'.length);
        return Utilities.toFirstLetterUpperAllWords(stage) + ' Foundation Establishment';        
    }

}