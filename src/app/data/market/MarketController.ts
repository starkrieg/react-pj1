import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { CharacterController } from "../character/CharacterController";
import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { ZoneRegionEnum } from "../exploration/ZoneRegionEnum";
import { Item } from "../items/Item";
import { ItemMarketZone } from "../items/ItemGreatZoneEnum";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { Utilities } from "../utils/Utilities";
import { ItemMarketCreator } from "./ItemMarketCreator";
import { MarketItem } from "./MarketItem";
import { RequirementInterface } from "./RequirementInterface";

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

    static addMarketItem(item: Item, cost: number, requirements: RequirementInterface[] = []){
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

}