'use client'

import { Attribute } from "../../character/Attribute";
import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { CharacterController } from "../../character/CharacterController";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";
import { ErrorController } from "../../utils/ErrorController";
import { EnergyRealmController } from "../EnergyRealmController";
import { BaseEnergyRealm } from "./BaseEnergyRealm";
import { EnergyRealmEnum } from "./EnergyRealmEnum";

export class QiCondensationGeneric extends BaseEnergyRealm {

    constructor(realmId: EnergyRealmEnum) {
        super(realmId, [], []);
        this.createRealmUpRequirements();
        this.createRealmUpEffects();
    }

    private createRealmUpRequirements() {
        // realm up requirements consider the value as a % of the cap filles
        switch (this.id) {
            case EnergyRealmEnum.QI_CONDENSATION_1:
                this.requirements.push(new Attribute(AttributeTypeEnum.QI_CAP_PERCENT, 100)); //100% of qi cap filled
                break;
            case EnergyRealmEnum.QI_CONDENSATION_2:
            case EnergyRealmEnum.QI_CONDENSATION_3:
            case EnergyRealmEnum.QI_CONDENSATION_4:
            case EnergyRealmEnum.QI_CONDENSATION_5:
            case EnergyRealmEnum.QI_CONDENSATION_6:
            case EnergyRealmEnum.QI_CONDENSATION_7:
            case EnergyRealmEnum.QI_CONDENSATION_8:
            case EnergyRealmEnum.QI_CONDENSATION_9:
                this.requirements.push(new Attribute(AttributeTypeEnum.QI_CAP_PERCENT, 80)); //80% of qi cap filled
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
                break;
            default:
                ErrorController.throwSomethingWrongError();
                break;
        }
    }

    getNextRealm() {
        const perfection = CharacterController.getCharacter()
                .getAttributeValue(AttributeTypeEnum.ENERGY_REALM_PERFECTION);
                
        switch (this.id) {
            case EnergyRealmEnum.QI_CONDENSATION_1:
                return EnergyRealmController.getRealmById(EnergyRealmEnum.QI_CONDENSATION_2);
            case EnergyRealmEnum.QI_CONDENSATION_2:
                return EnergyRealmController.getRealmById(EnergyRealmEnum.QI_CONDENSATION_3);
            case EnergyRealmEnum.QI_CONDENSATION_3:
                return EnergyRealmController.getRealmById(EnergyRealmEnum.QI_CONDENSATION_4);
            case EnergyRealmEnum.QI_CONDENSATION_4:
                return EnergyRealmController.getRealmById(EnergyRealmEnum.QI_CONDENSATION_5);
            case EnergyRealmEnum.QI_CONDENSATION_5:
                return EnergyRealmController.getRealmById(EnergyRealmEnum.QI_CONDENSATION_6);
            case EnergyRealmEnum.QI_CONDENSATION_6:
                if (perfection >= 5) {
                    return EnergyRealmController.getRealmById(
                        EnergyRealmEnum.QI_CONDENSATION_7);
                } else {
                    return EnergyRealmController.getRealmById(
                        EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                }
            case EnergyRealmEnum.QI_CONDENSATION_7:
                if (perfection >= 6) {
                    return EnergyRealmController.getRealmById(
                        EnergyRealmEnum.QI_CONDENSATION_8);
                } else {
                    return EnergyRealmController.getRealmById(
                        EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                }
            case EnergyRealmEnum.QI_CONDENSATION_8:
                if (perfection >= 7) {
                    return EnergyRealmController.getRealmById(
                        EnergyRealmEnum.QI_CONDENSATION_9);
                } else {
                    return EnergyRealmController.getRealmById(
                        EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
                }
            case EnergyRealmEnum.QI_CONDENSATION_9:
                return EnergyRealmController.getRealmById(
                    EnergyRealmEnum.FOUNDATION_ESTABLISHMENT_EARLY);
            default:
                return EnergyRealmController.getRealmById(EnergyRealmEnum.UNKNOWN)
        }
    }

}