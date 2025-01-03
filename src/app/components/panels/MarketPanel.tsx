import { MarketController } from "@/app/data/market/MarketController";
import { ButtonMarketItem } from "../Button";
import { CharacterController } from "@/app/data/character/CharacterController";
import { AttributeTypeEnum } from "@/app/data/character/AttributeTypeEnum";
import { MarketItem } from "@/app/data/market/MarketItem";

export function MarketPanel() {

    const availableItems = MarketController.getAllAvailableItems();

    const unlockedItems = availableItems.filter(mi => {
                if ( mi.requirements.length > 0) {
                    return mi.requirements.every(req => req.isRequirementMet());
                } else {
                    return true;
                }
            });

    const isHasItems = unlockedItems.length > 0;

    return (
        <div className="market">
            { isHasItems && MarketItemList(unlockedItems) }
            { !isHasItems && TextNoItemsAvailable() }
        </div>
    );

}

function TextNoItemsAvailable() {
    return (
        <div style={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 15,
            marginTop: 100
        }}>
            No items available
        </div>
    );
}

function MarketItemList(itemList: Readonly<MarketItem[]>) {

    const marketInventory = itemList.map(marketItem => {
        const canBuy = CharacterController.getCharacter()
            .getAttributeValue(AttributeTypeEnum.COIN) >= marketItem.cost;
        return ButtonMarketItem(marketItem, canBuy);
    });

    return (
        <div className="market-item-list">
            { marketInventory }
        </div>
    );
}