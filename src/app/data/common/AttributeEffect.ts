import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { ModifierTypeEnum } from "./ModifierTypeEnum";

export class AttributeEffect {

    attribute: AttributeTypeEnum;
    modifierType: ModifierTypeEnum;
    value: number;

    constructor(attribute: AttributeTypeEnum, modifierType: ModifierTypeEnum, value: number) {
        this.attribute = attribute;
        this.modifierType = modifierType;
        this.value = value;
    }

}