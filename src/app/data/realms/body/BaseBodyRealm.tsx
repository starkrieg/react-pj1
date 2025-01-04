'use client'

import { AttributeEffect } from "../../common/AttributeEffect";
import { BaseRealm } from "../common/BaseRealm";
import { BodyRealmEnum } from "./BodyRealmEnum";
import { BodyRealmController } from "../BodyRealmController";
import { IRequirement } from "../../common/IRequirement";

export class BaseBodyRealm extends BaseRealm {

    id: BodyRealmEnum;

    constructor(realmId: BodyRealmEnum, realmUpRequirements: IRequirement[], 
            realmUpEffects: AttributeEffect[]) {
        super(realmUpRequirements, realmUpEffects);
        this.id = realmId;
    }
    
    getNextRealm() {
        return BodyRealmController.getRealmById(BodyRealmEnum.UNKNOWN);
    }

}