'use client'

import { Attribute } from "../../character/Attribute";
import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";
import { EnergyRealmController } from "../EnergyRealmController";
import { BaseEnergyRealm } from "./BaseEnergyRealm";
import { EnergyRealmEnum } from "./EnergyRealmEnum";

export class FoundationEstablishment extends BaseEnergyRealm {

    stage: string;

    constructor(realmId: EnergyRealmEnum) {
        // assuming Foundation Establishment id follows pattern of foundation-establishment-x
        const stage: string = realmId.substring('foundation-establishment-'.length);
        
        let reqQi = 0;

        switch (stage) {
            case 'early':
                reqQi = 20000
                break;
            case 'middle':
                reqQi = 30000
                break;
            case 'late':
                reqQi = 45000
                break;
            default:
                break;
        }

        const requirements = [
            new Attribute(AttributeTypeEnum.QI, reqQi),
        ];

        super(realmId, requirements, []);

        this.stage = stage;

        this.createRealmUpEffects();
    }

    private createRealmUpEffects() {
        switch (this.stage) {
            case 'early':
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.MULTI, 2);
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 5000);
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, 
                    ModifierTypeEnum.ADD, 10);
                break;
            case 'middle':
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 60100);
                break;
            case 'late':
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.MULTI, 2);
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                        ModifierTypeEnum.MULTI, 2);
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN,
                    ModifierTypeEnum.ADD, 20);
                break;
            default:
                break;
        }
    }

    getNextRealm() {
        switch (this.stage) {
            case 'early':
                return EnergyRealmController.getRealmById(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_MIDDLE);
            case 'middle':
                return EnergyRealmController.getRealmById(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_LATE);
            case 'late':
            default:
                return EnergyRealmController.getRealmById(EnergyRealmEnum.UNKNOWN);
        }        
    }

}