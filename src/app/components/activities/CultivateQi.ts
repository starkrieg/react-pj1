import { Character } from "../Character";
import { Activity } from "./Activity";

export class CultivateQi extends Activity {
    
    constructor(id: string, title: string, desc: string,
        charRef: Character) {
        super(id, title, desc, charRef);

        this.action = () => {
            //use rank to affect the value
            const tickGain = this.getTickGain();
            this.charRef.increaseQi(tickGain);

            this.incrementExp(1);
        }
    }

    getTickGain() {
        const bruteValue = this.charRef.getBaseQiGain();
        const rankMult = 1 + ((this.rank-1) * 0.1);
        return ( bruteValue * rankMult );
    }

}