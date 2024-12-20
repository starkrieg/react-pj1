'use client'

import { AttributeEffect } from "../../common/AttributeEffect";
import { BaseRealm } from "../common/BaseRealm";
import { Attribute } from "../../character/Attribute";
import { BodyRealmEnum } from "./BodyRealmEnum";
import { BodyRealmController } from "../BodyRealmController";

export class BaseBodyRealm extends BaseRealm {

    id: BodyRealmEnum;

    constructor(realmId: BodyRealmEnum, requirements: Attribute[], 
            realmUpEffects: AttributeEffect[]) {
        super(requirements, realmUpEffects);
        this.id = realmId;
    }
    
    getNextRealm() {
        return BodyRealmController.getRealmById(BodyRealmEnum.UNKNOWN);
    }

}