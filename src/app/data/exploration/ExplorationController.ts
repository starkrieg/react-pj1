
import GameController from "../GameController";
import { ExplorableZone } from "./ExplorableZone";
import { ExploreZoneEnum } from "./ExploreZoneEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";

export class ExplorationController {

    gameController: GameController;

    selectedZone: ExploreZoneEnum;
    explorableZoneList: ExplorableZone[];

    constructor(gameController: GameController) {
        this.gameController = gameController;

        this.selectedZone = ExploreZoneEnum.NOTHING;
        this.explorableZoneList = [];
    }

    reset() {
        this.selectedZone = ExploreZoneEnum.NOTHING;
        this.explorableZoneList = []
    }
    
    getSelectedExplorableZoneTitle() {
        const title = this.explorableZoneList.find((zone) => zone.id == this.selectedZone)?.title
        return title || 'Nothing';
    }
    
    createExplorableZone(zoneEnum: ExploreZoneEnum,
        title: string, description: string, 
        zoneSize: number, minimumPowerRequired: number,
        itemClearRewardId: ItemIdEnum
    ) {

        // error when:
        // zone, title, description or item reward is undefined/empty
        // zone size is equal or below 0
        // minimum power required is below 0
        if (!zoneEnum || !title || !description || zoneSize <= 0 || minimumPowerRequired < 0 || !itemClearRewardId) {
            console.log('Something went wrong!');
            alert('Something went wrong! Please report this!');
            return;
        }

        const zone = new ExplorableZone(
            zoneEnum,
            title,
            description,
            zoneSize,
            minimumPowerRequired,
            itemClearRewardId
        );

        this.explorableZoneList.push(zone);

    }
    
    doClickZone(zoneId: ExploreZoneEnum) {
        // is no zone selected, then select one
        // if this zone already selected, then remove selection
        // if another zone selected, then select this new one now
        if (this.selectedZone != zoneId) {
            this.selectedZone = zoneId;
        } else {
            this.doClickRetreatFromZone();
        }
    }

    /**
     * Retreats from zone exploration.
     * Clears zone progress and removes selected zone.
     */
    doClickRetreatFromZone() {
        this.getSelectedZone().clearProgress();
        this.selectedZone = ExploreZoneEnum.NOTHING
    }

    private getSelectedZone() {
        const zone = this.explorableZoneList.find((zone) => zone.id == this.selectedZone);
        if (zone) {
            return zone;
        } else {
            console.log('Something went wrong!');
            alert('Something went wrong! Please report this!');
            throw Error('Something went wrong!');
        }
    }

    /**
     * Progresses zone and gives appropriate reward.
     */
    doExploreSelectedZone() {
        const zoneStepPowerReq = this.getSelectedZone().getCurrentStepPowerReq() || 0;
        const character = this.gameController.character;
        const characterPower = character.getCharacterPower();

        if (characterPower >= zoneStepPowerReq) {
            const isFirstClear = this.getSelectedZone().progressZone();
            
            //give reward after the progress is made
            const moneyGain = 1;
            character.increaseMoney(moneyGain);
            this.gameController.messageController.pushMessageSimple(`Found something! Got ${moneyGain} coin(s)`)
            
            //give final reward if zone completed first time
            if (isFirstClear) {
                const rewardItemId = this.getSelectedZone().itemClearRewardId;
                const rewardItem = this.gameController.itemController.getItemById(rewardItemId);
                //give the character the item
                this.gameController.character.giveItem(rewardItemId);
                //publish message on zone finish
                this.gameController.messageController.pushMessageSimple(`You finished exploring [${this.getSelectedZone().title}] !`);
                //publish message on clear reward
                this.gameController.messageController.pushMessageSimple(`Found something! Got [${rewardItem?.name}]`)
                //kick from zone when first clear
                this.doClickRetreatFromZone();
            }
        } else {
            //not strong enough, get kicked out from zone
            this.gameController.messageController.pushMessageSimple(`You were defeated at [${this.getSelectedZone().title}] and barely escaped with your life!`)
            this.doClickRetreatFromZone();
        }

    }

}