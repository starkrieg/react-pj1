import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ActivityEnum } from "./ActivityEnum";

export interface IActivity {

    id: ActivityEnum;
    title: string;
    desc: string;

    unlockRequirements: (ItemIdEnum | ZoneIdEnum)[]

    action: CallableFunction;

    getTickGain() : number

}