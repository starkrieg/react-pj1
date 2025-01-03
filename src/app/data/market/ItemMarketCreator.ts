import { ActivityEnum } from "../activities/ActivityEnum";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { Item } from "../items/Item";
import { ItemController } from "../items/ItemController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ErrorController } from "../utils/ErrorController";
import { ActivityRequirement } from "./ActivityRequirement";
import { AttributeCapPercentRequirement } from "./AttributeCapPercentRequirement";
import { ItemRequirement } from "./ItemRequirement";
import { MarketController } from "./MarketController";
import { RequirementInterface } from "./RequirementInterface";

export class ItemMarketCreator {

    private static addItemToMarket(item: Item | undefined, basicCost: number,
        requirements: RequirementInterface[] = []
    ) {
        if (item) {
            MarketController.addMarketItem(item, basicCost, requirements);
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    static createMarketItems() {
        this.createVillageMarketItems();
        this.createSmallSectMarketItems();
        this.createSelfMarketUpgrades();
        MarketController.updateAvailableItems();
    }

    private static createVillageMarketItems() {
        const villageNotes = ItemController.getItemById(ItemIdEnum.BOOK_NOTES_ON_PEOPLE);
        this.addItemToMarket(villageNotes, 1000,
            [ /* unlock requirements */
                new ActivityRequirement(ActivityEnum.PERFORM_ODD_JOBS, 25)
            ]
        );

        const shopkeeping = ItemController.getItemById(ItemIdEnum.BOOK_SHOPKEEPING_MANUAL);
        this.addItemToMarket(shopkeeping, 100000,
            [ /* unlock requirements */
                new ItemRequirement(ItemIdEnum.ITEM_WORKING_TOOLS),
                new ActivityRequirement(ActivityEnum.PERFORM_ODD_JOBS, 200)
            ]
        );

        const confucian = ItemController.getItemById(ItemIdEnum.BOOK_CONFUCIAN_SCRIPTURES_I);
        this.addItemToMarket(confucian, 10000,
            [ /* unlock requirements */
                new ActivityRequirement(ActivityEnum.MEDITATE, 50)
            ]
        );

        const weaponBlade = ItemController.getItemById(ItemIdEnum.WEAPON_IRON_BLADE);
        this.addItemToMarket(weaponBlade, 500);

        const armorLeatherVest = ItemController.getItemById(ItemIdEnum.ARMOR_LEATHER_VEST);
        this.addItemToMarket(armorLeatherVest, 500);

        const hireWarriorI = ItemController.getItemById(ItemIdEnum.HIRE_WARRIOR_I);
        this.addItemToMarket(hireWarriorI, 10000);

        const ironWeights = ItemController.getItemById(ItemIdEnum.ITEM_IRON_WEIGHTS);
        this.addItemToMarket(ironWeights, 5000,
            [ /* unlock requirements */
                new ActivityRequirement(ActivityEnum.PHYSICAL_TRAINING, 50)
            ]
        );

        const workingTools = ItemController.getItemById(ItemIdEnum.ITEM_WORKING_TOOLS);
        this.addItemToMarket(workingTools, 1500,
            [ /* unlock requirements */
                new ActivityRequirement(ActivityEnum.PERFORM_ODD_JOBS, 50)
            ]
        );

        const pillPoorHealing = ItemController.getItemById(ItemIdEnum.PILL_POOR_HEALING);
        this.addItemToMarket(pillPoorHealing, 500);

        const pillQiBoostI = ItemController.getItemById(ItemIdEnum.PILL_QI_BOOST_I);
        this.addItemToMarket(pillQiBoostI, 2500, 
        [
            /* requirements */
            new AttributeCapPercentRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 0, 100)
        ]);

        const tonic = ItemController.getItemById(ItemIdEnum.PILL_STRENGTH_ELIXIR);
        this.addItemToMarket(tonic, 250,
        [
            /* requirements */
            new AttributeCapPercentRequirement(AttributeTypeEnum.BODY_CAP_PERCENT, 0, 100)
        ]);
    }

    private static createSmallSectMarketItems() {
        const taoist = ItemController.getItemById(ItemIdEnum.BOOK_TAOIST_SCRIPTURES_I);
        this.addItemToMarket(taoist, 1000000
            ,
            [ /* unlock requirements */
                new ActivityRequirement(ActivityEnum.MEDITATE, 300)
            ]
        );

        const underhanded = ItemController.getItemById(ItemIdEnum.BOOK_UNDERHANDED_METHODS_I);
        this.addItemToMarket(underhanded, 10000000,
            [ /* unlock requirements */
                new ActivityRequirement(ActivityEnum.PERFORM_ODD_JOBS, 400)
            ]
        );

        const weaponFlyingSword_i = ItemController.getItemById(ItemIdEnum.WEAPON_FLYING_SWORD_I);
        this.addItemToMarket(weaponFlyingSword_i, 5000);

        const armorSpiritualSilk_i = ItemController.getItemById(ItemIdEnum.ARMOR_SPIRITUAL_SILK_I);
        this.addItemToMarket(armorSpiritualSilk_i, 5000);

        const weaponFlyingSword_ii = ItemController.getItemById(ItemIdEnum.WEAPON_FLYING_SWORD_II);
        this.addItemToMarket(weaponFlyingSword_ii, 50000);

        const armorSpiritualSilk_ii = ItemController.getItemById(ItemIdEnum.ARMOR_SPIRITUAL_SILK_II);
        this.addItemToMarket(armorSpiritualSilk_ii, 50000);

        const weaponFlyingSword_iii = ItemController.getItemById(ItemIdEnum.WEAPON_FLYING_SWORD_III);
        this.addItemToMarket(weaponFlyingSword_iii, 500000);

        const armorSpiritualSilk_iii = ItemController.getItemById(ItemIdEnum.ARMOR_SPIRITUAL_SILK_III);
        this.addItemToMarket(armorSpiritualSilk_iii, 500000);

        const hireCultivator_i = ItemController.getItemById(ItemIdEnum.HIRE_CULTIVATOR_I);
        this.addItemToMarket(hireCultivator_i, 50000);

        const hireCultivator_ii = ItemController.getItemById(ItemIdEnum.HIRE_CULTIVATOR_II);
        this.addItemToMarket(hireCultivator_ii, 500000);

        const hireCultivator_iii = ItemController.getItemById(ItemIdEnum.HIRE_CULTIVATOR_III);
        this.addItemToMarket(hireCultivator_iii, 5000000);

        const incense = ItemController.getItemById(ItemIdEnum.ITEM_MYSTIC_INCENSE);
        this.addItemToMarket(incense, 500000,
            [   /* unlock requirements */
                new ActivityRequirement(ActivityEnum.MEDITATE, 200)
            ]
        );

        const cultivationMat = ItemController.getItemById(ItemIdEnum.ITEM_CULTIVATION_MAT);
        this.addItemToMarket(cultivationMat, 500000,
            [ /* unlock requirements */
                new ActivityRequirement(ActivityEnum.CULTIVATE_QI, 50)
            ]
        );

        const pillAverageHealing = ItemController.getItemById(ItemIdEnum.PILL_AVERAGE_HEALING);
        this.addItemToMarket(pillAverageHealing, 2000);

        const pillQiBoostII = ItemController.getItemById(ItemIdEnum.PILL_QI_BOOST_II);
        this.addItemToMarket(pillQiBoostII, 10000,
        [
            /* requirements */
            new AttributeCapPercentRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 0, 100)
        ]);

        const pillQiBoostIII = ItemController.getItemById(ItemIdEnum.PILL_QI_BOOST_III);
        this.addItemToMarket(pillQiBoostIII, 50000,
        [
            /* requirements */
            new AttributeCapPercentRequirement(AttributeTypeEnum.QI_CAP_PERCENT, 0, 100)
        ]);

        const bloodGinseng1y = ItemController.getItemById(ItemIdEnum.BLOOD_GINSENG_1Y);
        this.addItemToMarket(bloodGinseng1y, 2000,
        [
            /* requirements */
            new AttributeCapPercentRequirement(AttributeTypeEnum.BODY_CAP_PERCENT, 0, 100)
        ]);

        const bloodGinseng10y = ItemController.getItemById(ItemIdEnum.BLOOD_GINSENG_10Y);
        this.addItemToMarket(bloodGinseng10y, 8000,
        [
            /* requirements */
            new AttributeCapPercentRequirement(AttributeTypeEnum.BODY_CAP_PERCENT, 0, 100)
        ]);
    }

    static createSelfMarketUpgrades() {
        const openBusiness = ItemController.getItemById(ItemIdEnum.SELF_OPEN_BUSINESS);
        this.addItemToMarket(openBusiness, 1000000,
            [ /* unlock requirements */
                new ItemRequirement(ItemIdEnum.BOOK_SHOPKEEPING_MANUAL),
                new ActivityRequirement(ActivityEnum.PERFORM_ODD_JOBS, 300)
            ]
        );
    }

}