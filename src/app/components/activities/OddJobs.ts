import { Character } from "../Character";
import { Activity } from "./Activity";

export class OddJobs extends Activity {
    
    constructor(id: string, title: string, desc: string,
        charRef: Character) {
        super(id, title, desc, charRef);

        this.action = () => {
            //use rank to affect the value
            const tickGain = this.getTickGain();
            this.charRef.increaseMoney(tickGain);

            this.incrementExp(1);
        }
    }

    getTickGain() {
        const bruteValue = 1;
        const bodyToMoneyDifferential = 25;
        const ticksPerMonth = 2;
        const valueBeforeRank = bruteValue + (this.charRef.body / bodyToMoneyDifferential);
        const rankMult = 1 + ((this.rank-1) * 0.05);
        return ( valueBeforeRank * rankMult / ticksPerMonth);
    }

}