'use client'

import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";
import { ItemIdEnum } from "../../items/ItemIdEnum";
import { ItemRequirement } from "../../common/ItemRequirement";
import { ErrorController } from "../../utils/ErrorController";
import { BaseEnergyRealm } from "./BaseEnergyRealm";
import { EnergyRealmEnum } from "./EnergyRealmEnum";
import { AttributeRequirement } from "../../common/AttributeRequirement";
import { ActivityRequirement } from "../../common/ActivityRequirement";
import { ActivityEnum } from "../../activities/ActivityEnum";

export class QiCondensationGeneric extends BaseEnergyRealm {

    constructor(realmId: EnergyRealmEnum) {
        const nextRealms = [];
        const unlockRequirements = [];
        
        switch (realmId) {
            case EnergyRealmEnum.QI_CONDENSATION_1:
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_2);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_2:
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_3);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_3:
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_4);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_4:
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_5);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_5:
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_6);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_6:
                nextRealms.push(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_7);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_7:
                nextRealms.push(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_8);
                unlockRequirements.push(new ItemRequirement(ItemIdEnum.BOOK_PERFECT_QI_CONDENSATION));
                break;
            case EnergyRealmEnum.QI_CONDENSATION_8:
                //condensation 8 should only come from 7
                nextRealms.push(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                nextRealms.push(EnergyRealmEnum.QI_CONDENSATION_9);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_9:
                //condensation 9 should only come from 8
                nextRealms.push(EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                break;
            default:
                break;
        }

        super(realmId, [], [], nextRealms, unlockRequirements);
        this.createRealmUpRequirements();
        this.createRealmUpEffects();
    }

    private createRealmUpRequirements() {
        // realm up requirements consider the value as a % of the cap filles
        switch (this.id) {
            case EnergyRealmEnum.QI_CONDENSATION_1:
                this.realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 100)); //100% of qi cap filled
                this.realmUpRequirements.push(new ActivityRequirement(ActivityEnum.CULTIVATE_QI, 25));
                break;
            case EnergyRealmEnum.QI_CONDENSATION_2:
            case EnergyRealmEnum.QI_CONDENSATION_3:
                this.realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 80)); //80% of qi cap filled
                break;
            case EnergyRealmEnum.QI_CONDENSATION_4:
                this.realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 80)); //80% of qi cap filled
                this.realmUpRequirements.push(new ActivityRequirement(ActivityEnum.CULTIVATE_QI, 50));
                break;
            case EnergyRealmEnum.QI_CONDENSATION_5:
            case EnergyRealmEnum.QI_CONDENSATION_6:
                this.realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 80)); //80% of qi cap filled
                break;
            case EnergyRealmEnum.QI_CONDENSATION_7:
                this.realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 100)); //100% of qi cap filled
                this.realmUpRequirements.push(new ActivityRequirement(ActivityEnum.MEDITATE, 100));
                this.realmUpRequirements.push(new ActivityRequirement(ActivityEnum.CULTIVATE_QI, 100));
                break;
            case EnergyRealmEnum.QI_CONDENSATION_8:
            case EnergyRealmEnum.QI_CONDENSATION_9:
                this.realmUpRequirements.push(new AttributeRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 100)); //100% of qi cap filled
                break;
            default:
                ErrorController.throwSomethingWrongError();
                break;
        }
    }

    private createRealmUpEffects() {
        switch(this.id) {
            case EnergyRealmEnum.QI_CONDENSATION_1:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 900); //qi cap becomes 1000
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, 
                    ModifierTypeEnum.ADD, 10);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_2:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 2000); //qi cap becomes 3000
                break;
            case EnergyRealmEnum.QI_CONDENSATION_3:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 3000); //qi cap becomes 6000
                break;
            case EnergyRealmEnum.QI_CONDENSATION_4:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 4000); //qi cap becomes 10000
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, 
                    ModifierTypeEnum.ADD, 10);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_5:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 5000); //qi cap becomes 15000
                break;
            case EnergyRealmEnum.QI_CONDENSATION_6:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 5000); //qi cap becomes 20000
                break;
            case EnergyRealmEnum.QI_CONDENSATION_7:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 10000); //qi cap becomes 30000
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, 
                    ModifierTypeEnum.ADD, 10);
                break;
            case EnergyRealmEnum.QI_CONDENSATION_8:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 15000); //qi cap becomes 45000
                break;
            case EnergyRealmEnum.QI_CONDENSATION_9:
                this.createRealmUpEffect(AttributeTypeEnum.QI_BASE_CAPACITY, 
                    ModifierTypeEnum.ADD, 25000); //qi cap becomes 70000
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, 
                    ModifierTypeEnum.ADD, 20);
                this.createRealmUpEffect(AttributeTypeEnum.ENERGY_REALM_PERFECTION, 
                    ModifierTypeEnum.ADD, 1);
                break;
            default:
                ErrorController.throwSomethingWrongError();
                break;
        }
    }

}