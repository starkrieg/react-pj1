import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ActivityEnum } from "./ActivityEnum";

export interface Activity {

    id: ActivityEnum;
    title: string;
    desc: string;

    unlockRequirements: (ItemIdEnum | ExploreZoneIdEnum)[]

    action: CallableFunction;

    getTickGain() : number



}