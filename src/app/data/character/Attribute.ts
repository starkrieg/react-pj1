import { AttributeTypeEnum } from "./AttributeTypeEnum";

export class Attribute {

    id: AttributeTypeEnum;
    value: number;

    constructor(id: AttributeTypeEnum, value: number) {
        this.id = id;
        this.value = value;
    }

}