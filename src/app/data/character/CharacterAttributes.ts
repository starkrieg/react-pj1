import { AttributeTypeEnum } from "./AttributeTypeEnum";

export class CharacterAttributes {

    private attributes: Map<AttributeTypeEnum, number> = new Map<AttributeTypeEnum, number>();

    constructor() {
        // qi is an attribute related to spells and power, 
        // and a main guideline for cultivation
        this.attributes.set(AttributeTypeEnum.QI, 0);
        //base capacity for easy addition of fixed values on realms or items
        this.attributes.set(AttributeTypeEnum.QI_BASE_CAPACITY, 0);
        //total cap considers base cap plus body and soul
        this.attributes.set(AttributeTypeEnum.QI_TOTAL_CAPACITY, 0);

        // body represents how strong is the character's body
        // helps guide some cultivation aspects
        this.attributes.set(AttributeTypeEnum.BODY, 0);
        this.attributes.set(AttributeTypeEnum.BODY_CAPACITY, 0);
        
        // helps guide some cultivation aspects
        this.attributes.set(AttributeTypeEnum.SOUL, 0);

        // talent is a guide to how fast the character can grow
        // talent multiples Qi Capacity and every attribute Base Gain
        // more talent means faster growth
        this.attributes.set(AttributeTypeEnum.TALENT, 0);
    }

    setAttributeValue(attribute: AttributeTypeEnum, value: number) {
        this.attributes.set(attribute, value);
    }

    getAttributeValue(attribute: AttributeTypeEnum) {
        return this.attributes.get(attribute);
    }

    addAttributeValue(attribute: AttributeTypeEnum, value: number) {
        const currentValue = this.getAttributeValue(attribute) || 0;
        this.attributes.set(attribute, currentValue + value);
    }

    toExportFormat() : Array<[AttributeTypeEnum, number]>{
        return this.attributes.entries().toArray();
    }
}