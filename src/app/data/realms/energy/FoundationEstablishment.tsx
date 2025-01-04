'use client'

import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";
import { IRequirement } from "../../common/IRequirement";
import { BaseEnergyRealm } from "./BaseEnergyRealm";
import { EnergyRealmEnum } from "./EnergyRealmEnum";
import { AttributeRequirement } from "../../common/AttributeRequirement";
import { ActivityRequirement } from "../../common/ActivityRequirement";
import { ActivityEnum } from "../../activities/ActivityEnum";

export class FoundationEstablishment extends BaseEnergyRealm {

    stage: string;

    constructor(realmId: EnergyRealmEnum) {
        // assuming Foundation Establishment id follows pattern of foundation-establishment-x
        const stage: string = realmId.substring('foundation-establishment-'.length);
        
        const nextRealms = [];
        const unlockRequirements: IRequirement[] = [];
        const realmUpRequirements: IRequirement[] = [];

        switch (stage) {
            case 'early':
                nextRealms.push(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_MIDDLE);
                unlockRequirements.push();
                realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 100)); //100% of qi cap filled
                realmUpRequirements.push(new ActivityRequirement(ActivityEnum.CULTIVATE_QI, 75));
                realmUpRequirements.push(new ActivityRequirement(ActivityEnum.MEDITATE, 25));
                break;
            case 'middle':
                nextRealms.push(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_LATE);
                unlockRequirements.push();
                realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 80)); //80% of qi cap filled
                break;
            case 'late':
                nextRealms.push(EnergyRealmEnum.UNKNOWN);
                unlockRequirements.push();
                realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 70)); //70% of qi cap filled
                realmUpRequirements.push(new ActivityRequirement(ActivityEnum.CULTIVATE_QI, 100));
                realmUpRequirements.push(new ActivityRequirement(ActivityEnum.MEDITATE, 50));
                break;
            default:
                break;
        }

        super(realmId, realmUpRequirements, [], nextRealms, unlockRequirements);

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

}