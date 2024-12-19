import { CharacterController } from "../character/CharacterController";
import { MessageController } from "../messages/MessageController";
import { ErrorController } from "../utils/ErrorController";
import { Utilities } from "../utils/Utilities";
import { ExplorationController } from "./ExplorationController";
import FightAttributes from "./FightAttributes";

export default class FightScene {

    characterCurrentHealth: number;
    enemy: FightAttributes;

    private readonly ENEMY_HEALTH_MOD: number = 1.5;

    /**
     * a simple number to control turns
     * 0 == character
     * 1 == enemy
     */
    private fightTurn: number;

    private fightExpReward: number = 0;

    constructor(characterCurrentHealth: number, enemyPower: number) {
        const enemyHealth = enemyPower * this.ENEMY_HEALTH_MOD;
        this.enemy = new FightAttributes(enemyHealth, enemyPower);
        this.characterCurrentHealth = characterCurrentHealth;
        this.fightTurn = 0;
        this.fightExpReward = this.calculateFightExpReward();
    }

    private calculateFightExpReward() {
        //base fight experience is 1/10th of enemy power
        //and then a comparison with current power
        //being too strong means less experience

        const baseFightExp = this.enemy.power/10;
        if (baseFightExp <= 1) {
            return 1;
        } else {
            const charPowerComparison = this.getCharPowerComparison();
            const finalExp = Math.max((baseFightExp / charPowerComparison), 1);
            return Utilities.roundTo2Decimal(finalExp);
        }
    }

    private getCharPowerComparison() {
        return (CharacterController.getCharacterPower() / this.enemy.power);
    }

    newFight(enemyPower: number) {
        const enemyHealth = enemyPower * this.ENEMY_HEALTH_MOD;
        this.enemy = new FightAttributes(enemyHealth, enemyPower);
        this.fightTurn = 0;
        this.fightExpReward = this.calculateFightExpReward();
    }

    performFightTurn() {
        this.performTurnActions();
    }

    private performTurnActions() {
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
        const BASE_DODGE_CHANCE = 25;
        
        const isCharacterTurn = this.fightTurn == 0;

        const charPowerComparison = this.getCharPowerComparison();
        
        //positive means char can dodge more often
        //negative means enemy can dodge more often
        const dodgeChance = (charPowerComparison - 1) * BASE_DODGE_CHANCE;

        const damageMod = (Math.random() * 0.35) + 0.5;

        let finalDamage = -1;

        let isMissedAttack = false;

        if (isCharacterTurn) {
            if (dodgeChance >= 0) {
                isMissedAttack = false;
            } else {
                isMissedAttack = (Math.random() * 100) > (100 - (-dodgeChance))
            }
            if (!isMissedAttack) {
                //damage rounded to no decimals
                finalDamage = Utilities.roundTo2Decimal(CharacterController.getCharacterPower() * damageMod);
                    
                if (finalDamage > 0) {
                    this.enemy.health = Utilities.roundTo2Decimal(this.enemy.health - finalDamage);
                }
                MessageController.pushMessageFight(`You attacked the enemy for ${finalDamage} damage!`);
            } else {
                MessageController.pushMessageFight(`You missed the attack!`);
            }
        } else {
            if (dodgeChance <= 0) {
                isMissedAttack = false;
            } else {
                isMissedAttack = (Math.random() * 100) > (100 - dodgeChance)
            }
            if (!isMissedAttack) {
                //damage rounded to no decimals
                finalDamage = Utilities.roundTo2Decimal(this.enemy.power * damageMod);
                
                if (finalDamage > 0) {
                    this.characterCurrentHealth = Utilities.roundTo2Decimal(this.characterCurrentHealth - finalDamage);
                }
                MessageController.pushMessageFight(`Enemy attacked you for ${finalDamage} damage!`);
            }
        }
    }

    giveAfterFightExp() {
        const rewardExp = Utilities.roundTo2Decimal(this.getFightExpReward());
        CharacterController.incrementFightExperience(rewardExp);
        MessageController.pushMessageSimple(`You defeated the enemy! Got ${rewardExp} experience!`);
    }

    giveAfterFightResources() {
        //give reward after the progress is made
        const resourcesGuide = ExplorationController.getSelectedZone()?.getAvailableResources();
        if (resourcesGuide) {
            const resourceGainOption = Utilities.roundTo0Decimal(Math.random() * 9);
            switch (resourceGainOption) {
                case 0: //coin
                case 1:
                    const moneyGain = Utilities.roundTo0Decimal(Math.random() * resourcesGuide.coin);
                    if (moneyGain > 0) {
                        CharacterController.increaseMoney(moneyGain);
                        MessageController.pushMessageLoot(`Found ${moneyGain} coin(s)!`)    
                    }
                    break;
                case 2: //qi
                case 3:
                    const qiGain = Utilities.roundTo2Decimal(Math.random() * resourcesGuide.qi);
                    if (qiGain > 0) {
                        CharacterController.increaseQi(qiGain);
                        MessageController.pushMessageLoot(`Found a strange herb! Gained ${qiGain} Qi!`)    
                    }
                    break;
                case 4: //body
                case 5:
                    const bodyGain = Utilities.roundTo2Decimal(Math.random() * resourcesGuide.body);
                    if (bodyGain > 0) {
                        CharacterController.increaseBody(bodyGain);
                        MessageController.pushMessageLoot(`Found quality food! Gained ${bodyGain} Body!`)    
                    }
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
            }
        }
    }


    isCharacterAlive() {
        return this.characterCurrentHealth > 0;
    }

    isEnemyAlive() {
        return this.enemy.health > 0;
    }

    getFightExpReward() {
        return this.fightExpReward;
    }
    
}
