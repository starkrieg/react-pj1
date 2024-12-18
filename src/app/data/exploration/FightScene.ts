import { MessageController } from "../messages/MessageController";
import { ErrorController } from "../utils/ErrorController";
import { Utilities } from "../utils/Utilities";
import FightAttributes from "./FightAttributes";

export default class FightScene {

    character: FightAttributes;
    enemy: FightAttributes;

    /**
     * a simple number to control turns
     * 0 == character
     * 1 == enemy
     */
    private fightTurn: number;

    private fightExpReward: number = 0;

    constructor(character: FightAttributes, enemy: FightAttributes) {
        this.character = character;
        this.enemy = enemy;
        this.fightTurn = 0;

        this.fightExpReward = this.calculateFightExpReward();
    }

    private calculateFightExpReward() {
        //base fight experience is 1/10th of enemy power
        //and then a comparison with current power
        //being too strong means less experience

        const charPowerComparison = (this.character.power / this.enemy.power);
        const baseFightExp = (Math.max(this.enemy.power/10) || 1);
        return baseFightExp * charPowerComparison;        
    }

    newFight(enemy: FightAttributes) {
        this.enemy = enemy;
        this.fightTurn = 0;
        this.fightExpReward = this.calculateFightExpReward();
    }

    performFightTurn() {
        // character turn
        if ([0,1].includes(this.fightTurn)) {
            this.doAttack();
        } else {
            //something went wrong
            ErrorController.throwSomethingWrongError();
            return;
        }
        // change turn
        this.fightTurn = (this.fightTurn + 1) % 2;
    }

    /**
     * Attacker's power directly reduces Target's health
     * @param attacker the one that attackes
     * @param target the one that loses health
     */
    private doAttack() {
        /* Damage is between 75% to 100% power */
        /* That is so fights last a little longer and have some luck involved */

        const isCharacterTurn = this.fightTurn == 0;

        const attacker = isCharacterTurn ? this.character : this.enemy
        const target = isCharacterTurn ? this.enemy : this.character

        const damageMod = (Math.random() * 0.35) + 0.5;

        //damage rounded to no decimals
        const finalDamage = Utilities.roundTo2Decimal(attacker.power * damageMod);
        
        if (finalDamage > 0) {
            target.health = Utilities.roundTo2Decimal(target.health - finalDamage);
        }

        if (isCharacterTurn) {
            MessageController.pushMessageFight(`Attacked enemy for ${finalDamage} damage!`);
        } else {
            MessageController.pushMessageFight(`Enemy attacked you for ${finalDamage} damage!`);
        }
    }    

    isCharacterAlive() {
        return this.character.health > 0;
    }

    isEnemyAlive() {
        return this.enemy.health > 0;
    }

    getFightExpReward() {
        return this.fightExpReward;
    }
    
}
