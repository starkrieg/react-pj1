
import { ExplorableZone } from "./ExplorableZone";
import { ItemController } from "../items/ItemController";
import { MessageController } from "../messages/MessageController";
import { CharacterController } from "../character/CharacterController";
import { ErrorController } from "../utils/ErrorController";
import { ContentUnlockController } from "../ContentUnlockController";
import FightScene from "./FightScene";
import ZonePool from "./ZonePool";

export class ExplorationController {

    static selectedZone: ExplorableZone | undefined = undefined;
    private static unlockedZones: ExplorableZone[] = [];

    private static fightScene: FightScene | undefined;

    /**
     * Resets all data
     * Used on game hard reset
     */
    static hardReset() {
        this.selectedZone = undefined;
        // reset all zones to un-explored state
        this.unlockedZones.forEach(zone => zone.resetZoneClear());
        // remove all zones from unlocked list
        this.unlockedZones = [];
    }
    
    static getSelectedExplorableZoneTitle() {
        return this.selectedZone ? this.selectedZone.title : 'Nothing';
    }

    static getListExplorableZones() {
        return this.unlockedZones;
    }
    
    static addExplorableZone(zone: ExplorableZone) {
        if (!zone) {
            ErrorController.throwSomethingWrongError();
            return;
        }
        this.unlockedZones.push(zone);

        //order unlocked list
        const allZones = ZonePool.getZonePool()
        this.unlockedZones = allZones.filter(zone => this.unlockedZones.includes(zone));
    }
    
    static doClickZone(zone: ExplorableZone) {
        // is no zone selected, then select one
        // if this zone already selected, then remove selection
        // if another zone selected, then select this new one now
        if (!this.selectedZone || this.selectedZone.id != zone.id) {
            this.selectedZone = zone;
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
        this.selectedZone = undefined;
        //clean fight stuff
        this.cleanFightZone()
    }

    private static cleanFightZone() {
        this.fightScene = undefined;
    }

    static getSelectedZone() {
        if (this.selectedZone) {
            return this.selectedZone;
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    static createFightScene() {
        const characterHealth = CharacterController.getHealth();
        const enemyPower = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;
        const enemyName = this.getSelectedZone()?.getRandomEnemyName() || 'Enemy';

        this.fightScene = new FightScene(
            characterHealth, enemyPower, enemyName
        )
    }

    static progressFightScene() {
        if (this.fightScene) {
            const enemyName = this.getSelectedZone()?.getRandomEnemyName() || 'Enemy';
            const enemyPower = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;
            this.fightScene.newFight(enemyPower, enemyName);
        }
    }

    /**
     * Progresses zone and gives appropriate reward.
     */
    static doExploreSelectedZone() {
        if (!this.fightScene) {
            this.createFightScene();
        } 

        this.fightScene?.performFightTurn();

        if (!this.fightScene?.isCharacterAlive()) {
            //character died
            //not strong enough, get kicked out from zone
            MessageController.pushMessageSimple(`You were defeated at [${this.getSelectedZone()?.title}] and barely escaped with your life!`)
            this.doClickRetreatFromZone();
        } else if (!this.fightScene?.isEnemyAlive()) {
            //enemy died
            const isFirstClear = this.getSelectedZone()?.progressZone();

            CharacterController.incrementFightCount();

            this.fightScene.giveAfterFightExp();

            this.fightScene.giveAfterFightResources();
            
            //give final reward if zone completed first time
            if (isFirstClear) {
                //publish message on zone finish
                MessageController.pushMessageSimple(`You finished exploring [${this.getSelectedZone()?.title}] !`);

                CharacterController.giveItem(this.selectedZone?.id)

                const listRewardItemId = this.getSelectedZone()?.listClearRewardItemId;

                if (listRewardItemId && listRewardItemId.length > 0) {
                    listRewardItemId.forEach(itemId => {
                        //give the character the item
                        CharacterController.giveItem(itemId);
                        
                        const rewardItem = ItemController.getItemById(itemId);
                        //item can exist as ID, but not as giveable item
                        //like certificate of zone clearance or invisible flags that player should not know about
                        if (rewardItem) {
                            //publish message on clear reward
                            MessageController.pushMessageSimple(`Found something! Got [${rewardItem?.name}]`);
                        }
                    });
                }

                //update game data based on the rewards
                ContentUnlockController.unlockContent();
                
                //kick from zone when first clear
                this.doClickRetreatFromZone();
            } else {
                //Enemy defeated, but zone not cleared
                this.progressFightScene();
            }
        }
        // if both character and enemy are alive, then fight continues
    }

    static getFightScene() : Readonly<FightScene | undefined> {
        return this.fightScene;
    }

}