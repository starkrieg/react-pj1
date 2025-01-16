import { CharacterController } from "../character/CharacterController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { IRequirement as IRequirement, RequirementExportFormat } from "./IRequirement";

export class ItemRequirement implements IRequirement {

    id: ItemIdEnum;

    constructor(id: ItemIdEnum) {
        this.id = id;
    }

    isRequirementMet() : boolean {
        return CharacterController.isHaveItem(this.id);
    }

    toExportFormat() : RequirementExportFormat {
        return {
            type: 'item',
            data: {
                id: this.id
            }
        };
    }

}