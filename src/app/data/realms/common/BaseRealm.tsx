'use client'

import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { Character } from "../../character/Character";
import { AttributeEffect } from "../../common/AttributeEffect";
import { IRequirement } from "../../common/IRequirement";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";

export abstract class BaseRealm {

    realmUpRequirements: IRequirement[];
    realmUpEffects: AttributeEffect[];

    constructor(realmUpRequirements: IRequirement[], 
        realmUpEffects: AttributeEffect[]
    ) {
        this.realmUpRequirements = realmUpRequirements;
        this.realmUpEffects = realmUpEffects
        
    }

    createRealmUpEffect(id: AttributeTypeEnum, modifierType: ModifierTypeEnum, value: number) {
        this.realmUpEffects.push(new AttributeEffect(id, modifierType, value));
    }

    getRealmUpMultiplierFoundation() {
        return 1;
    }

    applyRealmUpEffects(character: Character) {
        const multiplierFoundationMod = this.getRealmUpMultiplierFoundation();
        this.realmUpEffects.forEach(effect => {
            if (effect.modifierType == ModifierTypeEnum.ADD) {
                character.increaseAttribute(effect.attribute, effect.value);
            } else if (effect.modifierType == ModifierTypeEnum.MULTI) {
                /* multi is usually for major realms or rare realms */
                /* multiply original effect.value by the character foundation first */
                const finalMulti = effect.value * multiplierFoundationMod;
                const attributeNewValue = character.getAttributeValue(effect.attribute) * finalMulti;
                character.setAttributeValue(effect.attribute, attributeNewValue);
            }
        });
    }
    
}