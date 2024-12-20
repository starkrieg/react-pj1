'use client'

import { EnergyRealmEnum } from "./EnergyRealmEnum";
import { AttributeEffect } from "../../common/AttributeEffect";
import { BaseRealm } from "../common/BaseRealm";
import { Attribute } from "../../character/Attribute";
import { EnergyRealmController } from "../EnergyRealmController";
import { Utilities } from "../../utils/Utilities";
import { CharacterController } from "../../character/CharacterController";
import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";

export class BaseEnergyRealm extends BaseRealm {

    id: EnergyRealmEnum;

    constructor(realmId: EnergyRealmEnum, requirements: Attribute[], 
            realmUpEffects: AttributeEffect[]) {
        super(requirements, realmUpEffects);
        this.id = realmId;
    }

    getNextRealm() {
        return EnergyRealmController.getRealmById(EnergyRealmEnum.UNKNOWN);
    }

    getRealmUpMultiplierFoundation() {
        const qiRealmUpEffect = this.realmUpEffects.find(effect => effect.attribute == AttributeTypeEnum.QI_BASE_CAPACITY);

        if (qiRealmUpEffect && qiRealmUpEffect.modifierType == ModifierTypeEnum.MULTI) {
            const qiCapPercent = Utilities.roundTo0Decimal(CharacterController.getCharacter().getQiCapPercent() * 100);
            const qiCapRequirementValue = this.requirements.find(req => req.id == AttributeTypeEnum.QI_CAP_PERCENT)?.value || 100;
        
            if (qiCapPercent < qiCapRequirementValue) {
                return qiCapRequirementValue / 100;
            } else {
                //will round return to 80%, 90% or 100% of supposed gains
                return (Math.floor(qiCapPercent / 10) * 10) / 100;
            }

        } else {
            return 1;
        }
    }

}