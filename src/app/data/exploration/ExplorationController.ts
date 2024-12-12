
import { ExplorableZone } from "./ExplorableZone";
import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ItemController } from "../items/ItemController";
import { MessageController } from "../messages/MessageController";
import { CharacterController } from "../character/CharacterController";
import { ErrorController } from "../utils/ErrorController";
import { ItemUnlockController } from "../items/ItemUnlockController";
import FightAttributes from "./FightAttributes";
import { Utilities } from "../utils/Utilities";

export class ExplorationController {

    static selectedZoneId: ExploreZoneIdEnum = ExploreZoneIdEnum.NOTHING;
    private static explorableZoneList: ExplorableZone[] = [];

    private static characterFightStats: FightAttributes | undefined;
    private static enemyFightStats: FightAttributes | undefined;

    /**
     * a simple number to control turns
     * 0 == character
     * 1 == enemy
     */
    private static fightTurn: number = 0;

    /**
     * Resets all data
     * Used on game hard reset
     */
    static hardReset() {
        this.selectedZoneId = ExploreZoneIdEnum.NOTHING;
        this.explorableZoneList = []
    }
    
    static getSelectedExplorableZoneTitle() {
        const title = this.explorableZoneList.find((zone) => zone.id == this.selectedZoneId)?.title
        return title || 'Nothing';
    }

    static getListExplorableZones() {
        return this.explorableZoneList;
    }
    
    static createExplorableZone(zoneEnum: ExploreZoneIdEnum,
        title: string, description: string, 
        zoneSize: number, minimumPowerRequired: number,
        listClearRewardItemId: ItemIdEnum[]
    ) {

        // error when:
        // zone, title, description or item reward is undefined/empty
        // zone size is equal or below 0
        // minimum power required is below 0
        if (!zoneEnum || !title || !description || zoneSize <= 0 || minimumPowerRequired < 0 || !listClearRewardItemId) {
            ErrorController.throwSomethingWrongError();
            return;
        }

        const zone = new ExplorableZone(
            zoneEnum,
            title,
            description,
            zoneSize,
            minimumPowerRequired,
            listClearRewardItemId
        );

        this.explorableZoneList.push(zone);

    }
    
    static doClickZone(zoneId: ExploreZoneIdEnum) {
        // is no zone selected, then select one
        // if this zone already selected, then remove selection
        // if another zone selected, then select this new one now
        if (this.selectedZoneId != zoneId) {
            this.selectedZoneId = zoneId;
        } else {
            this.doClickRetreatFromZone();
        }
    }

    /**
     * Retreats from zone exploration.
     * Clears zone progress and removes selected zone.
     */
    static doClickRetreatFromZone() {
        this.getSelectedZone()?.clearProgress();
        this.selectedZoneId = ExploreZoneIdEnum.NOTHING
        //clean fight stuff
        this.cleanFightZone()
    }

    private static cleanFightZone() {
        this.characterFightStats = undefined;
        this.enemyFightStats = undefined;
        this.fightTurn = 0;
    }

    static getSelectedZone() {
        const zone = this.explorableZoneList.find((zone) => zone.id == this.selectedZoneId);
        if (zone) {
            return zone;
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    static createFightStats() {
        const characterPower = CharacterController.getCharacterPower();
        const zoneStepPowerReq = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;

        this.characterFightStats = new FightAttributes(characterPower, characterPower);
        this.enemyFightStats = new FightAttributes(zoneStepPowerReq, zoneStepPowerReq);
    }

    /**
     * Progresses zone and gives appropriate reward.
     */
    static doExploreSelectedZone() {
        if (!this.characterFightStats || !this.enemyFightStats) {
            const characterPower = CharacterController.getCharacterPower();
            const zoneStepPowerReq = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;
    
            this.characterFightStats = new FightAttributes(characterPower, characterPower);
            this.enemyFightStats = new FightAttributes(zoneStepPowerReq, zoneStepPowerReq);
        }

        // character turn
        if (this.fightTurn == 0) {
            this.doAttack(this.characterFightStats, this.enemyFightStats, true);
        } else if (this.fightTurn == 1) {
            this.doAttack(this.characterFightStats, this.enemyFightStats, false);
        } else {
            //something went wrong
            ErrorController.throwSomethingWrongError();
            //retreat from fight
            this.doClickRetreatFromZone();
            return;
        }
        // change turn
        this.fightTurn = (this.fightTurn + 1) % 2;

        if (this.characterFightStats.health <= 0) {
            //character died
            //not strong enough, get kicked out from zone
            MessageController.pushMessageSimple(`You were defeated at [${this.getSelectedZone()?.title}] and barely escaped with your life!`)
            this.doClickRetreatFromZone();
        } else if (this.enemyFightStats.health <= 0) {
            //enemy died
            const isFirstClear = this.getSelectedZone()?.progressZone();

            CharacterController.incrementFightCount();

            //fight experience calc is a base value from zone, and then a comparison with current power
            //being too strong means less experience

            // 1/10th of the minimum area power times how strong you are compared to the zone
            const charPowerComparison = (this.characterFightStats.power 
                / (this.getSelectedZone()?.minPowerReq || this.characterFightStats.power));
            const rewardExp = (this.getSelectedZone()?.getBaseExpReward() || 1) 
                * charPowerComparison
            CharacterController.incrementFightExperience(Utilities.roundTo2Decimal(rewardExp));
            MessageController.pushMessageSimple(`You defeated the enemy! Got ${rewardExp} experience!`)

            //give reward after the progress is made
            const moneyGain = Utilities.roundTo0Decimal(Math.random() * 5);
            CharacterController.increaseMoney(moneyGain);
            MessageController.pushMessageSimple(`Found something! Got ${moneyGain} coin(s)`)
            
            //give final reward if zone completed first time
            if (isFirstClear) {
                //publish message on zone finish
                MessageController.pushMessageSimple(`You finished exploring [${this.getSelectedZone()?.title}] !`);
                
                const listRewardItemId = this.getSelectedZone()?.listClearRewardItemId;
                
                if (listRewardItemId && listRewardItemId.length > 0) {
                    listRewardItemId.forEach(itemId => {
                        //give the character the item
                        CharacterController.giveItem(itemId);

                        //update game data based on the reward
                        ItemUnlockController.unlockThingsFromItem(itemId)
                        
                        const rewardItem = ItemController.getItemById(itemId);
                        //item can exist as ID, but not as giveable item
                        //like certificate of zone clearance or invisible flags that player should not know about
                        if (rewardItem) {
                            //publish message on clear reward
                            MessageController.pushMessageSimple(`Found something! Got [${rewardItem?.name}]`);
                        }
                    });    
                }
                
                //kick from zone when first clear
                this.doClickRetreatFromZone();
            } else {
                //Enemy defeated, but zone not cleared
                this.fightTurn = 0;
                const zoneStepPowerReq = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;
                this.enemyFightStats = new FightAttributes(zoneStepPowerReq, zoneStepPowerReq);
            }
        }
        
        // if neither died, then fight continue

    }

    /**
     * Attacker's power directly reduces Target's health
     * @param attacker the one that attackes
     * @param target the one that loses health
     */
    private static doAttack(player: FightAttributes, enemy: FightAttributes, isCharacterTurn: boolean) {
        /* Damage is between 75% to 100% power */
        /* That is so fights last a little longer and have some luck involved */

        const attacker = isCharacterTurn ? player : enemy
        const target = isCharacterTurn ? enemy : player

        const damageMod = (Math.random() * 0.35) + 0.5;

        //damage rounded to no decimals
        const finalDamage = Utilities.roundTo0Decimal(attacker.power * damageMod);

        target.health -= finalDamage;

        if (isCharacterTurn) {
            MessageController.pushMessageFight(`Attacked enemy for ${finalDamage} damage!`);
        } else {
            MessageController.pushMessageFight(`Enemy attacked you for ${finalDamage} damage!`);
        }
    }

    static getZoneCharacterStats() : Readonly<FightAttributes> | undefined {
        return this.characterFightStats;
    }

    static getZoneCurrentEnemyStats() : Readonly<FightAttributes> | undefined {
        return this.enemyFightStats;
    }

}