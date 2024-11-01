import { Character } from "../Character";
import { ActivitiesEnum } from "./ActivitiesEnum";
import { Activity } from "./Activity";

export class CultivateQi extends Activity {
    
    constructor(charRef: Character) {
        const id = ActivitiesEnum.CULTIVATE_QI;
        const title = 'Cultivate Qi';
        const desc = 'Cultivate your Qi';

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