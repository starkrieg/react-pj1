import { AttributeTypeEnum } from "../character/AttributeTypeEnum";

export class ZoneLoot {

    type: AttributeTypeEnum;
    dropChance: number;
    value: number;

    constructor(type: AttributeTypeEnum, dropChance: number, value: number) {
        this.type = type;
        this.dropChance = dropChance;
        this.value = value;
    }

}
