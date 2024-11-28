import { ActivityEnum } from "./ActivityEnum";

export interface Activity {

    id: ActivityEnum;
    title: string;
    desc: string;
    
    action: CallableFunction;

    getTickGain() : number

}