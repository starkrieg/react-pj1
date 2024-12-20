import { CharacterController } from "../character/CharacterController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { RequirementInterface } from "./RequirementInterface";

export class ItemRequirement implements RequirementInterface {

    id: ItemIdEnum;

    constructor(id: ItemIdEnum) {
        this.id = id;
    }

    isRequirementMet() : boolean {
        return CharacterController.isHaveInventoryItem(this.id)
            || CharacterController.isHavePermanentItem(this.id);
    }

}