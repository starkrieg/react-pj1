import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { Utilities } from "../utils/Utilities";
import { ModifierTypeEnum } from "./ModifierTypeEnum";

export class AttributeEffectVO {

    text: string;

    constructor(attribute: AttributeTypeEnum, modifierType: ModifierTypeEnum, value: number) {
        
        let verb = 'Unknown';
        if (modifierType == ModifierTypeEnum.ADD) {
        verb = '+';
        } else if (modifierType == ModifierTypeEnum.MULTI) {
        verb = 'x'
        }

        const roundedValue = Utilities.roundTo2Decimal(value);
        this.text = `${this.toFirstLetterUppercase(attribute)} ${verb}${roundedValue}`;
    }

    private toFirstLetterUppercase(text: string) {
    return text.split('-').map(word => {
        return word.at(0)?.toUpperCase() + word.substring(1);
    }).join(' ');
    }

}