import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { CharacterController } from "../character/CharacterController";
import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { ZoneRegionEnum } from "../exploration/ZoneRegionEnum";
import { Item } from "../items/Item";
import { ItemMarketZone } from "../items/ItemMarketZone";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { Utilities } from "../utils/Utilities";
import { ItemMarketCreator } from "./ItemMarketCreator";
import { MarketItem } from "./MarketItem";
import { IRequirement, RequirementExportFormat } from "../common/IRequirement";
import { ItemController } from "../items/ItemController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ActivityRequirement } from "../common/ActivityRequirement";
import { AttributeRequirement } from "../common/AttributeRequirement";
import { ItemRequirement } from "../common/ItemRequirement";

export class MarketController {

    private static allMarketItems: MarketItem[] = [];

    private static availableItems: MarketItem[] = [];

    private static blockedRegions: Set<ItemMarketZone> = new Set<ItemMarketZone>();

    static isAnyMarketReagionAvailable() {
        const allMarketZones = Object.values(ItemMarketZone).filter(imz => imz != ItemMarketZone.NONE);

        return allMarketZones.length != this.blockedRegions.size;
    }

    static getAllAvailableItems() : Readonly<MarketItem[]> {
        return this.availableItems;
    }

    static updateAvailableItems() {
        const upgradeTypeItems = [ItemTypeEnum.WEAPON, ItemTypeEnum.ARMOR];

        if (!this.isAnyMarketReagionAvailable()) {
            return
        }

        this.availableItems = this.allMarketItems.filter(mi => {
            const isItemRegionAvailable = this.isItemRegionAvailable(mi.baseItem.itemZone);
            
            if (isItemRegionAvailable) {
                if (upgradeTypeItems.includes(mi.baseItem.type) && mi.baseItem.canUpgrade()) {
                    return true;
                } else if (!CharacterController.isHaveItem(mi.baseItem.id)) {
                    return true;
                }
                return false;
            }

            return false;
        });
    }

    private static isItemRegionAvailable(itemZone: ItemMarketZone) {
        if (this.blockedRegions.has(itemZone)) {
            return false;
        }
        switch (itemZone) {
            case ItemMarketZone.CALM_WIND_VILLAGE:
                return true;
            case ItemMarketZone.CALM_WIND_SECT:
                return CharacterController.isHaveZoneCleared(ZoneIdEnum.CALM_WIND_SECT_ENTRANCE);
            default:
                return false;
        }
    }

    static addBlockRegion(regionId: ZoneRegionEnum) {
        switch(regionId) {
            case ZoneRegionEnum.CALM_WIND_VILLAGE:
                this.blockedRegions.add(ItemMarketZone.CALM_WIND_VILLAGE);
                this.updateAvailableItems();
                break;
            case ZoneRegionEnum.CALM_WIND_SECT:
                this.blockedRegions.add(ItemMarketZone.CALM_WIND_SECT);
                this.updateAvailableItems();
                break;
            case ZoneRegionEnum.CALM_WIND_FOREST:
            case ZoneRegionEnum.CALM_WIND_VALLEY:
            default:
                break;
        }
    }

    static addMarketItem(item: Item, cost: number, requirements: IRequirement[] = []){
        if (!this.allMarketItems.find(mi => mi.baseItem.id == item.id)) {
            this.allMarketItems.push(new MarketItem(
                item,
                cost,
                requirements
            ));
        }
    }

    static buyItem(marketItem: MarketItem) {
        const character = CharacterController.getCharacter();
        const coins = character.getAttributeValue(AttributeTypeEnum.COIN);
        if (coins >= marketItem.cost) {
            character.increaseAttribute(AttributeTypeEnum.COIN, -marketItem.cost);
            if (CharacterController.isHaveItem(marketItem.baseItem.id)) {
                //have item, then upgrade it
                CharacterController.giveItemUpgrade(marketItem.baseItem);
            } else {
                //give item
                CharacterController.giveItem(marketItem.baseItem);
            }
            if (marketItem.baseItem.canUpgrade()) {
                marketItem.isUpgrade = true;
                marketItem.cost = Utilities.roundTo0Decimal(marketItem.cost * (marketItem.baseItem.UPGRADE_GROWTH_MOD));
                marketItem.name = `${marketItem.baseItem.name}+${(marketItem.baseItem.upgrades+1)}`;
                marketItem.updateMarketDescription();
            }
            this.updateAvailableItems();
        }
        //else not enough money to buy
    }

    static reset() {
        this.allMarketItems.forEach(mi => {
            mi.baseItem.upgrades = 0;
        });
        this.allMarketItems = [];
        this.blockedRegions.clear();
        ItemMarketCreator.createMarketItems();
        this.updateAvailableItems();
    }

    static exportSaveData() : Record<string, unknown> {
        return {
            //store all market items and their current upgrade
            allMarketItems: this.allMarketItems.map(marketItem => {
                return {
                    // translate item into itemId
                    itemId: marketItem.baseItem.id,
                    itemUpgrade: marketItem.baseItem.upgrades,
                    cost: marketItem.cost,
                    name: marketItem.name,
                    description: marketItem.description,
                    isUpgrade: marketItem.isUpgrade,
                    // translate requirements to wrapped export format
                    requirements: marketItem.requirements.map(req => req.toExportFormat())
                }
            }),
            //store all blocked regions
            blockedRegions: this.blockedRegions.values().toArray()
        }
    }

    static importSaveData(dataObject: Partial<Record<string, unknown>>) {
        //empty object is not processed
        if (!dataObject) {
            return;
        }

        (dataObject['allMarketItems'] as Array<Record<string, unknown>>)
            .forEach(obj => {
            const marketItem = this.allMarketItems.find(mktItem => mktItem.baseItem.id == obj.itemId)
            if (marketItem) {
                marketItem.baseItem.upgrades = obj.itemUpgrade as number;
                marketItem.cost = obj.cost as number;
                marketItem.name = obj.name as string;
                marketItem.description = obj.description as string;
                marketItem.isUpgrade = obj.isUpgrade as boolean;
                (obj.requirements as Array<RequirementExportFormat>).forEach(req => {
                    switch(req.type) {
                        case 'activity':
                            marketItem.requirements.push(new ActivityRequirement(req.data.id, req.data.rank));
                            break;
                        case 'attribute':
                            marketItem.requirements.push(new AttributeRequirement(req.data.id, req.data.minValue, req.data.maxValue));
                            break;
                        case 'item':
                            marketItem.requirements.push(new ItemRequirement(req.data.id));
                            break;
                        default:
                            console.error('Something went wrong when importing market item requirements');
                            break;
                    }
                });
            } else {
                console.error('Something went wrong when importing market items during save');
            }
        });

        (dataObject['blockedRegions'] as Array<ItemMarketZone>)
            .forEach(imz => this.blockedRegions.add(imz));

        this.updateAvailableItems();
    }

}