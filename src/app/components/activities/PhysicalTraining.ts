import { Character } from "../Character";
import { Activity } from "./Activity";

export class PhysicalTraining extends Activity {
    
    constructor(id: string, title: string, desc: string,
        charRef: Character) {
        super(id, title, desc, charRef);

        this.action = () => {
            //use rank to affect the value
            const tickGain = this.getTickGain();
            this.charRef.increaseBody(tickGain);
            
            this.incrementExp(1);
        }
    }

    //baseBodyGain has talent already applied
    //the % of qi capacity filled increases body gain
    getTickGain() {
        const bruteValue = this.charRef.getBaseBodyGain();
        const currQiMulti = 1 + this.charRef.getQiCapPercent();
        const rankMult = 1 + ((this.rank-1) * 0.1);
        return ( bruteValue * rankMult * currQiMulti);
    }

}