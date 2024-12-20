'use client'

import { AttributeTypeEnum } from "../../character/AttributeTypeEnum";
import { BaseRealmVO } from "../common/BaseRealmVO";
import { BodyRealmEnum } from "./BodyRealmEnum";

export class BodyRealmVO implements BaseRealmVO {

    title: string;
    desc: string;
    type: AttributeTypeEnum = AttributeTypeEnum.BODY

    constructor(realmId: BodyRealmEnum) {
        switch (realmId) {
            case BodyRealmEnum.MORTAL:
                this.title = 'Mortal Body';
                this.desc = 'A regular human body with limited potential';
                break;
            case BodyRealmEnum.REFINE_BODY_1:
            case BodyRealmEnum.REFINE_BODY_2:
            case BodyRealmEnum.REFINE_BODY_3:
            case BodyRealmEnum.REFINE_BODY_4:
            case BodyRealmEnum.REFINE_BODY_5:
            case BodyRealmEnum.REFINE_BODY_6:
            case BodyRealmEnum.REFINE_BODY_7:
            case BodyRealmEnum.REFINE_BODY_8:
            case BodyRealmEnum.REFINE_BODY_9:
                this.title = this.getBodyRefinementRealmTitle(realmId);
                this.desc = 'A regular human body with limited potential';
                break;
            case BodyRealmEnum.UNKNOWN:
            default:
                this.title = 'Unknown';
                this.desc = 'You have yet to understand what is this realm';
                break;
        }
    }

    private getBodyRefinementRealmTitle(realmId: BodyRealmEnum) {
        const stage = realmId.split('-');
        const isLongerStage = stage.length > 2;
        const stageName = isLongerStage ? 
            ( `${this.toUpperCaseFirstLetter(stage[1])} ${this.toUpperCaseFirstLetter(stage[2])}` )
            : this.toUpperCaseFirstLetter(stage[1]);
        return `Refining ${stageName}`;
    }

    private toUpperCaseFirstLetter(text: string) {
        return text.at(0)?.toUpperCase() + text.substring(1);
    }

}