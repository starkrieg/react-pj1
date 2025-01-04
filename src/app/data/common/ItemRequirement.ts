import { CharacterController } from "../character/CharacterController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { IRequirement as IRequirement } from "./IRequirement";

export class ItemRequirement implements IRequirement {

    id: ItemIdEnum;

    constructor(id: ItemIdEnum) {
        this.id = id;
    }

    isRequirementMet() : boolean {
        return CharacterController.isHaveItem(this.id);
    }

}