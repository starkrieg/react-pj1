
import { ExplorableZone } from "./ExplorableZone";
import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ItemController } from "../items/ItemController";
import { MessageController } from "../messages/MessageController";
import { CharacterController } from "../character/CharacterController";
import { ErrorController } from "../utils/ErrorController";
import { ItemUnlockController } from "../items/ItemUnlockController";

export class ExplorationController {

    static selectedZoneId: ExploreZoneIdEnum = ExploreZoneIdEnum.NOTHING;
    private static explorableZoneList: ExplorableZone[] = [];

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
    }

    static getSelectedZone() {
        const zone = this.explorableZoneList.find((zone) => zone.id == this.selectedZoneId);
        if (zone) {
            return zone;
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    /**
     * Progresses zone and gives appropriate reward.
     */
    static doExploreSelectedZone() {
        const zoneStepPowerReq = this.getSelectedZone()?.getCurrentStepPowerReq() || 0;
        const characterPower = CharacterController.getCharacterPower();

        if (characterPower >= zoneStepPowerReq) {
            const isFirstClear = this.getSelectedZone()?.progressZone();
            
            //give reward after the progress is made
            const moneyGain = 1;
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
                            MessageController.pushMessageSimple(`Found something! Got [${rewardItem?.name}]`)        
                        }
                    });    
                }
                
                //kick from zone when first clear
                this.doClickRetreatFromZone();
            }
        } else {
            //not strong enough, get kicked out from zone
            MessageController.pushMessageSimple(`You were defeated at [${this.getSelectedZone()?.title}] and barely escaped with your life!`)
            this.doClickRetreatFromZone();
        }

    }

}