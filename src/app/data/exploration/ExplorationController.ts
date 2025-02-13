
import { Zone } from "./Zone";
import { ItemController } from "../items/ItemController";
import { MessageController } from "../messages/MessageController";
import { CharacterController } from "../character/CharacterController";
import { ErrorController } from "../utils/ErrorController";
import { ContentUnlockController } from "../ContentUnlockController";
import FightScene from "./FightScene";
import ZonePool from "./ZonePool";
import { MarketController } from "../market/MarketController";
import { ZoneRegionEnum } from "./ZoneRegionEnum";
import { ZoneRegion } from "./ZoneRegion";
import { ZoneIdEnum } from "./ZoneIdEnum";
import { Utilities } from "../utils/Utilities";
import { ZoneVO } from "./ZoneVO";
import { EventController } from "../events/EventController";
import { ZoneLootVO } from "./ZoneLootVO";

export class ExplorationController {

    static selectedZone: Zone | undefined = undefined;

    //controls regions and their inner zones
    private static allRegions: ZoneRegion[] = [];

    //list regions that are not explorable
    private static blockedRegions: Set<ZoneRegionEnum> = new Set<ZoneRegionEnum>();

    //zones that are unlocked - internal control
    private static unlockedZones: Zone[] = [];

    //zones with extra difficulties in % - internal control
    private static extraDifficulties: Map<ZoneIdEnum, number> = new Map<ZoneIdEnum, number>();

    //the zones that will be displayed
    private static explorableZonesVO: ZoneVO[] = [];

    private static fightScene: FightScene | undefined;

    static addZoneDifficulty(zoneId: ZoneIdEnum, value: number) {
        const currentDiffValue = this.extraDifficulties.get(zoneId) || 1;
        this.extraDifficulties.set(zoneId, Utilities.roundTo2Decimal(currentDiffValue * value));
        this.updateExplorableZonesList();
    }

    static addBlockRegion(regionId: ZoneRegionEnum) {
        this.blockedRegions.add(regionId)
        this.updateExplorableZonesList();
    }

    static addRegion(region: ZoneRegion) {
        this.allRegions.push(region);
        this.updateExplorableZonesList();
    }

    /**
     * Resets all data
     */
    static reset() {
        this.selectedZone = undefined;
        // reset all zones to un-explored state
        this.unlockedZones.forEach(zone => zone.resetZoneClear());
        // remove all zones from unlocked list
        this.unlockedZones = [];
        this.blockedRegions.clear();
        this.extraDifficulties.clear();
        this.explorableZonesVO = [];
    }
    
    static getSelectedExplorableZoneTitle() {
        return this.selectedZone ? this.selectedZone.title : 'Nothing';
    }

    static getListExplorableZonesVO() {
        return this.explorableZonesVO;
    }
    
    static addExplorableZone(zone: Zone) {
        if (!zone) {
            ErrorController.throwSomethingWrongError();
            return;
        }
        this.unlockedZones.push(zone);

        this.updateExplorableZonesList();
    }

    private static updateExplorableZonesList() {
        //gets order from ZonePool
        const allZones = ZonePool.getZonePool()
        const blockedZones = this.allRegions.filter(region => this.blockedRegions.has(region.id))
            .map(region => region.zones)
            .flat();

        this.explorableZonesVO = allZones.filter(zone => {
            return this.unlockedZones.includes(zone)
                && !blockedZones.includes(zone.id)
        }).map(zone => {

            const lootVO: ZoneLootVO[] = zone.getLootList().map(zoneLoot => {
                const item = ItemController.getItemById(zoneLoot.itemId);
                return new ZoneLootVO(
                    zoneLoot.itemId,
                    item?.name || 'Unknown',
                    zoneLoot.dropChance,
                    zoneLoot.isLimited()
                );
            });

            const clearRewardVO: ZoneLootVO[] = zone.listClearRewardItemId.map(itemId => {
                const item = ItemController.getItemById(itemId);
                return new ZoneLootVO(
                    itemId,
                    item?.name || 'Unknown',
                    100,
                    true
                );
            });

            return new ZoneVO(
                zone.id,
                zone.title,
                zone.desc,
                this.applyZoneExtraDifficulty(zone.id, zone.getCurrentStepPowerReq()),
                zone.isComplete,
                lootVO,
                clearRewardVO
            )
        });

        //if character in a blocked zone, then kick from zone
        if (blockedZones.find(zoneId => zoneId == this.selectedZone?.id)) {
            this.doClickRetreatFromZone();
        }
    }

    private static applyZoneExtraDifficulty(zoneId: ZoneIdEnum, zonePower: number) {
        if (this.extraDifficulties.has(zoneId)) {
            return Utilities.roundTo2Decimal(this.extraDifficulties.get(zoneId)! * zonePower);
        } else {
            return Utilities.roundTo2Decimal(zonePower);
        }
    }
    
    static doClickZone(zoneVO: ZoneVO) {
        // is no zone selected, then select one
        // if this zone already selected, then remove selection
        // if another zone selected, then select this new one now
        if (!this.selectedZone || this.selectedZone.id != zoneVO.id) {
            this.selectedZone = this.unlockedZones.find(zone => zone.id == zoneVO.id);
        } else {
            this.doClickRetreatFromZone();
        }
    }

    /**
     * Retreats from zone exploration.
     * Clears zone progress and removes selected zone.
     */
    static doClickRetreatFromZone() {
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
        const enemyPower = this.applyZoneExtraDifficulty(
            this.getSelectedZone()!.id, this.getSelectedZone()!.getCurrentStepPowerReq()
            ) || 0;
        const enemyName = this.getSelectedZone()!.getRandomEnemyName() || 'Enemy';

        this.fightScene = new FightScene(
            characterHealth, enemyPower, enemyName
        )
    }

    static progressFightScene() {
        if (this.fightScene) {
            const enemyPower = this.applyZoneExtraDifficulty(
                this.getSelectedZone()!.id, this.getSelectedZone()!.getCurrentStepPowerReq()
                ) || 0;
            const enemyName = this.getSelectedZone()!.getRandomEnemyName() || 'Enemy';
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
            MessageController.pushMessageFight(`You were defeated at [${this.getSelectedZone()?.title}] and barely escaped with your life!`)
            this.doClickRetreatFromZone();
        } else if (!this.fightScene?.isEnemyAlive()) {
            //enemy died
            const isFirstClear = this.getSelectedZone()?.progressZone();

            CharacterController.incrementFightCount();

            this.fightScene.giveAfterFightExp();

            this.fightScene.giveAfterFightResources();
            
            //give final reward if zone completed first time
            if (isFirstClear) {
                this.updateExplorableZonesList();

                //publish message on zone finish
                MessageController.pushMessageGeneral(`You finished exploring [${this.getSelectedZone()?.title}] !`);

                CharacterController.giveZoneCleared(this.selectedZone!.id)

                const listRewardItemId = this.getSelectedZone()?.listClearRewardItemId;

                if (listRewardItemId && listRewardItemId.length > 0) {
                    listRewardItemId.forEach(itemId => {
                        
                        //give the character the reward item
                        CharacterController.giveItem( ItemController.getItemById(itemId) );
                    });
                }

                if (EventController.isZoneObserved(this.selectedZone!.id)) {
                    EventController.finishEventsByZone(this.selectedZone!.id);
                }

                //update game data based on the rewards
                ContentUnlockController.unlockContent();
                MarketController.updateAvailableItems();
                
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

    static exportSaveData() : Record<string, unknown> {
        return {
            // export only the id of the zone
            selectedZone: this.selectedZone?.id,
            
            //array of ids
            blockedRegions: this.blockedRegions.values().toArray(),

            //translate array Zone into array zone id
            unlockedZones: this.unlockedZones.map(zone => {
                return {
                    id: zone.id,
                    isComplete: zone.isComplete
                }
            }),

            //translate map to array of entries, but objs are simple enough
            extraDifficulties: this.extraDifficulties.entries().toArray()
        }
    }

    static importSaveData(dataObject: Partial<Record<string, unknown>>) {
        //empty object is not processed
        if (!dataObject) {
            return;
        }

        this.selectedZone = ZonePool.getZonePool()
            .find(zone => zone.id == (dataObject['selectedZone'] as ZoneIdEnum));
            
        (dataObject['blockedRegions'] as Array<ZoneRegionEnum>)
            .forEach(regionId => this.blockedRegions.add(regionId));

        //replace list of unlocked zones
        this.unlockedZones = [];
        const importedUnlockedData = (dataObject['unlockedZones'] as Array<Partial<Record<keyof Zone, any>>>);
        ZonePool.getZonePool()
            // obj should have an id and isComplete
            // filter by the ids passed on the dataObject
            .filter(zone => {
                return importedUnlockedData
                    .map(obj => obj.id).includes(zone.id)
            })
            // modify zone for the isComplete
            // then add to map
            .forEach(zone => {
                const importedZoneData = importedUnlockedData.find(obj => obj.id == zone.id)
                zone.isComplete = importedZoneData?.isComplete || false;
                this.unlockedZones.push(zone);
            });

        (dataObject['extraDifficulties'] as Array<[ZoneIdEnum, number]>)
            .forEach(([key, value]) => this.extraDifficulties.set(key, value));

        this.updateExplorableZonesList();
    }

}