import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { CharacterController } from "../character/CharacterController";
import { Utilities } from "../utils/Utilities";
import { IRequirement } from "./IRequirement";

/**
 * A requirement that checks an attribute capacity percentage as requirement
 * When a new attribute cap is created, this class must be updated to reflect it
 */
export class AttributeRequirement implements IRequirement {

    id: AttributeTypeEnum;

    //item show when above this value
    minValue: number;
    
    //item disappear when above or equal this value
    maxValue: number;

    constructor(id: AttributeTypeEnum, minValue: number = 0, maxValue: number = 0) {
        this.id = id;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    isRequirementMet() : boolean {
        const attributeValue = this.getAttributeValueFromId();

        if (this.maxValue <= 0) {
            return attributeValue >= this.minValue;
        } else {
            return this.minValue <= attributeValue && attributeValue < this.maxValue;    
        }
        
    }

    private getAttributeValueFromId() {
        switch(this.id) {
            case AttributeTypeEnum.QI_CAP_PERCENT:
                return Utilities.roundTo2Decimal(CharacterController.getCharacter().getQiCapPercent()*100);
            case AttributeTypeEnum.BODY_CAP_PERCENT:
                return Utilities.roundTo2Decimal(CharacterController.getCharacter().getBodyCapPercent()*100);
            default:
                return Utilities.roundTo2Decimal(CharacterController.getCharacter().getAttributeValue(this.id));
        }
    }

}