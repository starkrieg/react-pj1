'use client'

import { EnergyRealmEnum } from "./EnergyRealmEnum";
import { AttributeEffect } from "../../common/AttributeEffect";
import { BaseRealm } from "../common/BaseRealm";
import { EnergyRealmController } from "../EnergyRealmController";
import { Utilities } from "../../utils/Utilities";
import { CharacterController } from "../../character/CharacterController";
import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";
import { IRequirement } from "../../common/IRequirement";
import { AttributeRequirement } from "../../common/AttributeRequirement";

export class BaseEnergyRealm extends BaseRealm {

    id: EnergyRealmEnum;

    //possible next realms after this one
    private nextRealmList: EnergyRealmEnum[];

    //requirements for this realm to be unlock and used
    private unlockRequirements: IRequirement[];

    constructor(realmId: EnergyRealmEnum, realmUpRequirements: IRequirement[], 
            realmUpEffects: AttributeEffect[],
            nextRealmList: EnergyRealmEnum[],
            unlockRequirements: IRequirement[] = []) {
        super(realmUpRequirements, realmUpEffects);
        this.id = realmId;
        this.nextRealmList = nextRealmList;
        this.unlockRequirements = unlockRequirements;
    }

    isUnlocked() : boolean {
        if (this.unlockRequirements.length > 0) {
            return this.unlockRequirements.every(requirement => requirement.isRequirementMet());
        } else {
            return true;
        }
    }

    getNextRealmIdList() : Readonly<EnergyRealmEnum[]> {
        return this.nextRealmList;
    }

    getNextRealmList() : BaseEnergyRealm[] {
        return this.nextRealmList.map(id => EnergyRealmController.getRealmById(id));
    }

    getRealmUpMultiplierFoundation() {
        const qiRealmUpEffect = this.realmUpEffects.find(effect => effect.attribute == AttributeTypeEnum.QI_BASE_CAPACITY);

        if (qiRealmUpEffect && qiRealmUpEffect.modifierType == ModifierTypeEnum.MULTI) {
            const qiCapPercent = Utilities.roundTo0Decimal(CharacterController.getCharacter().getQiCapPercent() * 100);

            const attributeRequirement = this.realmUpRequirements.find(req => (req as AttributeRequirement).id == AttributeTypeEnum.QI_CAP_PERCENT);
            if (attributeRequirement) {
                const qiCapRequirementValue = (attributeRequirement as AttributeRequirement).minValue || 100;

                if (qiCapPercent < qiCapRequirementValue) {
                    return qiCapRequirementValue / 100;
                } else {
                    //will round return to 80%, 90% or 100% of supposed gains
                    return (Math.floor(qiCapPercent / 10) * 10) / 100;
                }

            } else {
                //will round return to 80%, 90% or 100% of supposed gains
                return (Math.floor(qiCapPercent / 10) * 10) / 100;
            }

        } else {
            return 1;
        }
    }

}