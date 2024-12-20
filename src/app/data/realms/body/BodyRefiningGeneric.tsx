'use client'

import { BodyRealmEnum } from "./BodyRealmEnum";
import { Attribute } from "../../character/Attribute";
import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { BaseBodyRealm } from "./BaseBodyRealm";
import { BodyRealmController } from "../BodyRealmController";
import { ErrorController } from "../../utils/ErrorController";
import { ModifierTypeEnum } from "../../common/ModifierTypeEnum";

export class BodyRefiningGeneric extends BaseBodyRealm {

    constructor(realmId: BodyRealmEnum) {
        super(realmId, [], []);
        this.createRealmUpRequirements();
        this.createRealmUpEffects();
    }

    private createRealmUpRequirements() {
        switch (this.id) {
            case BodyRealmEnum.REFINE_BODY_1:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 100));
                break;
            case BodyRealmEnum.REFINE_BODY_2:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 2000));
                break;
            case BodyRealmEnum.REFINE_BODY_3:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 5000));
                break;
            case BodyRealmEnum.REFINE_BODY_4:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 10000));
                break;
            case BodyRealmEnum.REFINE_BODY_5:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 20000));
                break;
            case BodyRealmEnum.REFINE_BODY_6:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 45000));
                break;
            case BodyRealmEnum.REFINE_BODY_7:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 70000));
                break;
            case BodyRealmEnum.REFINE_BODY_8:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 100000));
                break;
            case BodyRealmEnum.REFINE_BODY_9:
                this.requirements.push(new Attribute(AttributeTypeEnum.BODY, 150000));
                break;
            default:
                ErrorController.throwSomethingWrongError();
                break;
        }
    }

    private createRealmUpEffects() {
        //base body cap is 100
        //ignoring other bonuses to measure the expected progression of cap growth
        switch (this.id) {
            case BodyRealmEnum.REFINE_BODY_1:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 1900); //cap becomes 2000
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, ModifierTypeEnum.ADD, 10);
                break;
            case BodyRealmEnum.REFINE_BODY_2:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 3000); //cap becomes 5000
                break;
            case BodyRealmEnum.REFINE_BODY_3:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 5000); //cap becomes 10000
                break;
            case BodyRealmEnum.REFINE_BODY_4:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 10000); //cap becomes 20000
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, ModifierTypeEnum.ADD, 10);
                break;
            case BodyRealmEnum.REFINE_BODY_5:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 25000); //cap becomes 45000
                break;
            case BodyRealmEnum.REFINE_BODY_6:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 25000); //cap becomes 70000
                break;
            case BodyRealmEnum.REFINE_BODY_7:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 30000); //cap becomes 100000
                this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, ModifierTypeEnum.ADD, 10);
                break;
            case BodyRealmEnum.REFINE_BODY_8:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 50000); //cap becomes 150000
                break;
            case BodyRealmEnum.REFINE_BODY_9:
                this.createRealmUpEffect(AttributeTypeEnum.BODY_CAPACITY, 
                    ModifierTypeEnum.ADD, 50000); //cap becomes 200000
                    this.createRealmUpEffect(AttributeTypeEnum.LIFESPAN, ModifierTypeEnum.ADD, 20);
                break;
            default:
                ErrorController.throwSomethingWrongError();
                break;
        }
    }

    getNextRealm() {
        switch (this.id) {
            case BodyRealmEnum.REFINE_BODY_1:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_2);
            case BodyRealmEnum.REFINE_BODY_2:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_3);
            case BodyRealmEnum.REFINE_BODY_3:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_4);
            case BodyRealmEnum.REFINE_BODY_4:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_5);
            case BodyRealmEnum.REFINE_BODY_5:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_6);
            case BodyRealmEnum.REFINE_BODY_6:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_7);
            case BodyRealmEnum.REFINE_BODY_7:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_8);
            case BodyRealmEnum.REFINE_BODY_8:
                return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_9);
            case BodyRealmEnum.REFINE_BODY_9:
            default:
                return BodyRealmController.getRealmById(BodyRealmEnum.UNKNOWN);
        }
    }

}