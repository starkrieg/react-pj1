'use client'

import { BaseBodyRealm } from "./BaseBodyRealm";
import { BodyRealmEnum } from "./BodyRealmEnum";
import { BodyRealmController } from "../BodyRealmController";

export class MortalBodyRealm extends BaseBodyRealm {

    constructor() {
        super(BodyRealmEnum.MORTAL, [], []);
    }

    getNextRealm() {
        return BodyRealmController.getRealmById(BodyRealmEnum.REFINE_BODY_1);
    }

}