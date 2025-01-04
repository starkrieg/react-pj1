'use client'

import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { BodyRealmEnum } from "../body/BodyRealmEnum";
import { EnergyRealmEnum } from "../energy/EnergyRealmEnum";

export interface IBaseRealmVO {

    id: EnergyRealmEnum | BodyRealmEnum;
    title: string;
    desc: string;
    type: AttributeTypeEnum;
    isUnlocked: boolean;

}