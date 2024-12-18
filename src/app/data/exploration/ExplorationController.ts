
import { ExplorableZone } from "./ExplorableZone";
import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";
import { ItemController } from "../items/ItemController";
import { MessageController } from "../messages/MessageController";
import { CharacterController } from "../character/CharacterController";
import { ErrorController } from "../utils/ErrorController";
import { ContentUnlockController } from "../ContentUnlockController";
import FightAttributes from "./FightAttributes";
import { Utilities } from "../utils/Utilities";
import FightScene from "./FightScene";

export class ExplorationController {

    static selectedZoneId: ExploreZoneIdEnum = ExploreZoneIdEnum.NOTHING;
    private static explorableZoneList: Map<ExploreZoneIdEnum, ExplorableZone> = new Map<ExploreZoneIdEnum, ExplorableZone>();

    private static fightScene: FightScene | undefined;

    /**
     * Resets all data
     * Used on game hard reset
     */
    static hardReset() {
        this.selectedZoneId = ExploreZoneIdEnum.NOTHING;
        this.explorableZoneList.clear();
    }
    
    static getSelectedExplorableZoneTitle() {
        const title = this.explorableZoneList.get(this.selectedZoneId)?.title
        return title || 'Nothing';
    }

    static getListExplorableZones() {
        return this.explorableZoneList.values();
    }
    
    static addExplorableZone(zone: ExplorableZone) {
        if (!zone) {
            ErrorController.throwSomethingWrongError();
            return;
        }
        this.explorableZoneList.set(zone.id, zone);
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
        this.fightScene = undefined;
    }

    static getSelectedZone() {
        const zone = this.explorableZoneList.get(this.selectedZoneId);
        if (zone) {
            return zone;
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    static createFightScene() {
        const characterPower = CharacterController.getCharacterPower();
        const zoneStepPowerReq = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;

        this.fightScene = new FightScene(
            new FightAttributes(characterPower, characterPower),
            new FightAttributes(zoneStepPowerReq, zoneStepPowerReq)
        )
    }

    static progressFightScene() {
        if (this.fightScene) {
            const zoneStepPowerReq = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;
            this.fightScene.newFight(
                new FightAttributes(zoneStepPowerReq, zoneStepPowerReq)
            );
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

            const rewardExp = Utilities.roundTo2Decimal(this.fightScene.getFightExpReward());

            CharacterController.incrementFightExperience(rewardExp);
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
                    CharacterController.giveItem(this.selectedZoneId)
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
                    //update game data based on the reward
                    ContentUnlockController.unlockContent();
                }
                
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