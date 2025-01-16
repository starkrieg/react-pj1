import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { AttributeEffect } from "../common/AttributeEffect";
import { ModifierTypeEnum } from "../common/ModifierTypeEnum";
import { ItemController } from "./ItemController";
import { ItemMarketZone } from "./ItemMarketZone";
import { ItemIdEnum } from "./ItemIdEnum";
import { ItemTypeEnum } from "./ItemTypeEnum";

export default class ItemCreator {

    static createItemPool() {
        this.createPermanentItems();
        this.createCalmWindVillageItems();
        this.createCalmWindSectItems();
        this.createGeneralDroppableItems();
        this.createSelfUpgradeItems();
    }

    private static createPermanentItems() {
        ItemController.createItem(ItemIdEnum.BOOK_QI_CULTIVATION,
            ItemTypeEnum.PERMANENT,
            'Qi Cultivation Technique',
            'Spiritual sutras that connect the self with the beyond'
        )
        ItemController.createItem(ItemIdEnum.BOOK_MEDITATE_ON_SELF,
            ItemTypeEnum.PERMANENT,
            'The Way of The Inner Self',
            'Knowledge over meditation practices and developing the inner self'
        );
        ItemController.createItem(ItemIdEnum.BOOK_QI_SPELLS,
            ItemTypeEnum.PERMANENT,
            'Qi Manipulation Technique',
            'Knowledge on achieving different effects with Qi',
        );
        ItemController.createItem(ItemIdEnum.BOOK_FORAGING_MANUAL,
            ItemTypeEnum.PERMANENT,
            'The Way of Exploring Nature',
            'Knowledge on many different plants and minerals'
        );
        ItemController.createItem(ItemIdEnum.BOOK_PHYSICAL_TRAINING,
            ItemTypeEnum.PERMANENT,
            'The Way of Achieving Strength',
            'Knowledge on strengthening one\'s body with exercise'
        );
        ItemController.createItem(ItemIdEnum.BOOK_BODY_CULTIVATION,
            ItemTypeEnum.PERMANENT,
            'The Way of Unlimited Strength',
            'Knowledge on going beyond the body\'s limits and breakthrough'
        );
        ItemController.createItem(ItemIdEnum.BOOK_MARTIAL_ARTS,
            ItemTypeEnum.PERMANENT,
            'The Way of Martial Arts',
            'Knowledge on combat techniques for increased survival'
        );
        ItemController.createItem(ItemIdEnum.BOOK_VALLEY_SECRET_PATH,
            ItemTypeEnum.PERMANENT,
            'A secret path across the Myriad Beasts Valley',
            'Knowledge on secret paths on the Myriad Beasts Valley'
        );
        // calm wind village market items
        ItemController.createItem(ItemIdEnum.BOOK_NOTES_ON_PEOPLE,
            ItemTypeEnum.PERMANENT,
            'Notes on People and Commerce',
            'Notes on people, locations and commerce. Reduce Odd Jobs days by 1 (permanent)',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* no attribute effects */]
        );
        ItemController.createItem(ItemIdEnum.BOOK_SHOPKEEPING_MANUAL,
            ItemTypeEnum.PERMANENT,
            'The Way of The Shopkeeper',
            'Knowledge on finances, expenses and profits. Increases Odd Jobs gains by x2 (permanent)',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* no attribute effects */]
        );
        ItemController.createItem(ItemIdEnum.BOOK_CONFUCIAN_SCRIPTURES_I,
            ItemTypeEnum.PERMANENT,
            'The Way of Confucius I',
            'Knowledge on confucian texts, philosophy and life. Increases Meditate gains by x2 (permanent)',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* no attribute effects */]
        );
        // calm wind sect market items
        ItemController.createItem(ItemIdEnum.BOOK_TAOIST_SCRIPTURES_I,
            ItemTypeEnum.PERMANENT,
            'The Way of The Tao I',
            'Knowledge on taoist texts, philosophy and life. Increases Meditate gains by x2 (permanent)',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* no attribute effects */]
        );
        ItemController.createItem(ItemIdEnum.BOOK_UNDERHANDED_METHODS_I,
            ItemTypeEnum.PERMANENT,
            'Silver Tongue and Golden Hands I',
            'Knowledge on negotiating, deceiving, persuading and using force. Increases Odd Jobs gains by 2x (permanent)',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* no attribute effects */]
        );
        //other items
        ItemController.createItem(ItemIdEnum.BOOK_HEAVENS_EYE,
            ItemTypeEnum.PERMANENT,
            'The Way of The Heaven\'s Eye',
            'Knowledge on cultivating the rare Heaven\'s Eye'
        );
        ItemController.createItem(ItemIdEnum.BOOK_PERFECT_QI_CONDENSATION,
            ItemTypeEnum.PERMANENT,
            'The Way of Perfect Energy',
            'Knowledge on cultivating perfection to achieve ultimate power'
        );
    }

    private static createCalmWindVillageItems() {
        ItemController.createItem(
            ItemIdEnum.WEAPON_IRON_BLADE,
            ItemTypeEnum.WEAPON,
            'Sharp blade',
            'The weapon of a true warrior',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.ADD, 10)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.ARMOR_LEATHER_VEST,
            ItemTypeEnum.ARMOR,
            'Leather vest',
            'Leather and hide woven into protective gear',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.ADD, 10)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.HIRE_WARRIOR_I,
            ItemTypeEnum.ALLY,
            'Hire Warrior I',
            'A warrior who fights for a price',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.MULTI, 0.15),
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.MULTI, 0.15)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.ITEM_IRON_WEIGHTS,
            ItemTypeEnum.TEMPORARY,
            'Iron weights',
            'A set of iron weights for exercising. Increases Physical Training gains by x2',
            ItemMarketZone.CALM_WIND_VILLAGE
        );

        ItemController.createItem(
            ItemIdEnum.ITEM_WORKING_TOOLS,
            ItemTypeEnum.TEMPORARY,
            'Working Tools',
            'A set of good quality working tools. Increases Odd Jobs gains by x2',
            ItemMarketZone.CALM_WIND_VILLAGE
        );

        ItemController.createItem(
            ItemIdEnum.PILL_POOR_HEALING,
            ItemTypeEnum.CONSUMABLE,
            '1 star healing pill',
            'A poor quality pill that helps with healing',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.INTERNAL_DAMAGE, ModifierTypeEnum.SUB, 15)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.PILL_QI_BOOST_I,
            ItemTypeEnum.CONSUMABLE,
            '1 star Qi pill',
            'A poor quality pill that raises internal Qi',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.QI, ModifierTypeEnum.ADD, 15)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.PILL_STRENGTH_ELIXIR,
            ItemTypeEnum.CONSUMABLE,
            'Strength Elixir',
            'Special brewing made for warriors',
            ItemMarketZone.CALM_WIND_VILLAGE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.BODY, ModifierTypeEnum.ADD, 3)
            ]
        );
    }

    private static createCalmWindSectItems() {
        ItemController.createItem(
            ItemIdEnum.WEAPON_FLYING_SWORD_I,
            ItemTypeEnum.WEAPON,
            'Windflame Sword',
            '1 Star lightweight sword ideal for beginners',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.ADD, 110)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.ARMOR_SPIRITUAL_SILK_I,
            ItemTypeEnum.ARMOR,
            'Veil of Tranquil Spirit',
            '1 Star armor woven from silk and spiritual energy',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.ADD, 110)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.WEAPON_FLYING_SWORD_II,
            ItemTypeEnum.WEAPON,
            'Sword of the Tempest',
            '2 Star flying sword that crackles with energy',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.ADD, 1250)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.ARMOR_SPIRITUAL_SILK_II,
            ItemTypeEnum.ARMOR,
            'Shroud of Senerity',
            '2 Star armor made of refined spiritual silk and enriched energy',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.ADD, 1250)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.WEAPON_FLYING_SWORD_III,
            ItemTypeEnum.WEAPON,
            'Thunderclap Sword',
            '3 Star sword infused with the energy of the heavens',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.ADD, 14000)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.ARMOR_SPIRITUAL_SILK_III,
            ItemTypeEnum.ARMOR,
            'Mantle of Resolve',
            '3 Star armor that exudes a calm yet formidable presence',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.ADD, 14000)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.HIRE_CULTIVATOR_I,
            ItemTypeEnum.ALLY,
            'Hire Cultivator I',
            'A poor cultivator willing to work for a price',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.MULTI, 0.20),
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.MULTI, 0.20)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.HIRE_CULTIVATOR_II,
            ItemTypeEnum.ALLY,
            'Hire Cultivator II',
            'A strong cultivator who cannot resist money',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.MULTI, 0.25),
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.MULTI, 0.25)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.HIRE_CULTIVATOR_III,
            ItemTypeEnum.ALLY,
            'Hire Cultivator III',
            'A true cultivator who sees potential in you',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.POWER, ModifierTypeEnum.MULTI, 0.30),
                new AttributeEffect(AttributeTypeEnum.HEALTH, ModifierTypeEnum.MULTI, 0.30)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.ITEM_MYSTIC_INCENSE,
            ItemTypeEnum.TEMPORARY,
            'Mystic Incense',
            'Incense infused with spiritual energy for greater concentration and tranquil mind. Increases Meditate gains by x2',
            ItemMarketZone.CALM_WIND_SECT
        );

        ItemController.createItem(
            ItemIdEnum.ITEM_CULTIVATION_MAT,
            ItemTypeEnum.TEMPORARY,
            'Cultivation mat',
            'Made for cultivation. Increases Qi Cultivation gains by x2',
            ItemMarketZone.CALM_WIND_SECT
        );

        ItemController.createItem(
            ItemIdEnum.PILL_AVERAGE_HEALING,
            ItemTypeEnum.CONSUMABLE,
            'Average healing pill',
            '2 Star quality pill that helps with healing',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.INTERNAL_DAMAGE, ModifierTypeEnum.SUB, 60),
            ]
        );

        ItemController.createItem(
            ItemIdEnum.PILL_QI_BOOST_II,
            ItemTypeEnum.CONSUMABLE,
            '2 Star Qi pill',
            'A 2 Star quality pill that raises internal Qi',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.QI, ModifierTypeEnum.ADD, 60)
            ]
        );

        ItemController.createItem(
            ItemIdEnum.PILL_QI_BOOST_III,
            ItemTypeEnum.CONSUMABLE,
            '3 Star Qi pill',
            'A 3 Star quality pill that raises internal Qi',
            ItemMarketZone.CALM_WIND_SECT,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.QI, ModifierTypeEnum.ADD, 300)
            ]
        );
    }

    private static createGeneralDroppableItems() {
        ItemController.createItem(
            ItemIdEnum.SNOW_GINSENG_1Y,
            ItemTypeEnum.CONSUMABLE,
            '1y Snow Ginseng',
            'A very young snow ginseng with barelly any Qi',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.QI, ModifierTypeEnum.ADD, 25)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.SNOW_GINSENG_10Y,
            ItemTypeEnum.CONSUMABLE,
            '10y Snow Ginseng',
            'A somewhat young snow ginseng with some Qi',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.QI, ModifierTypeEnum.ADD, 100)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.SNOW_GINSENG_100Y,
            ItemTypeEnum.CONSUMABLE,
            '100y Snow Ginseng',
            'A quality snow ginseng with a lot of Qi',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.QI, ModifierTypeEnum.ADD, 1000)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.SNOW_GINSENG_1000Y,
            ItemTypeEnum.CONSUMABLE,
            '1000y Snow Ginseng',
            'A rare aged snow ginseng with almost too much Qi',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.QI, ModifierTypeEnum.ADD, 10000)
            ]
        );
        //
        ItemController.createItem(
            ItemIdEnum.BLOOD_GINSENG_1Y,
            ItemTypeEnum.CONSUMABLE,
            '1y Blood Ginseng',
            'A very young blood ginseng with barelly any blood essence',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.BODY, ModifierTypeEnum.ADD, 25)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.BLOOD_GINSENG_10Y,
            ItemTypeEnum.CONSUMABLE,
            '10y Blood Ginseng',
            'A somewhat young blood ginseng with some blood essence',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.BODY, ModifierTypeEnum.ADD, 100)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.BLOOD_GINSENG_100Y,
            ItemTypeEnum.CONSUMABLE,
            '100y Blood Ginseng',
            'A quality blood ginseng with a lot of blood essence',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.BODY, ModifierTypeEnum.ADD, 1000)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.BLOOD_GINSENG_1000Y,
            ItemTypeEnum.CONSUMABLE,
            '1000y Blood Ginseng',
            'A rare aged blood ginseng with almost too much blood essence',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.BODY, ModifierTypeEnum.ADD, 10000)
            ]
        );
        //
        ItemController.createItem(
            ItemIdEnum.POUCH_OF_COINS_S,
            ItemTypeEnum.CONSUMABLE,
            '(S) Pouch of Coins',
            'A small pouch of coins',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.COIN, ModifierTypeEnum.ADD, 100)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.POUCH_OF_COINS_M,
            ItemTypeEnum.CONSUMABLE,
            '(M) Pouch of Coins',
            'A medium sized pouch of coins',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.COIN, ModifierTypeEnum.ADD, 1000)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.POUCH_OF_COINS_G,
            ItemTypeEnum.CONSUMABLE,
            '(G) Pouch of Coins',
            'A big pouch of coins',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.COIN, ModifierTypeEnum.ADD, 10000)
            ]
        );
        ItemController.createItem(
            ItemIdEnum.GOLD_PIECE_S,
            ItemTypeEnum.CONSUMABLE,
            '(S) Gold Piece',
            'A small piece of gold',
            ItemMarketZone.NONE,
            [ /* attribute effects */
                new AttributeEffect(AttributeTypeEnum.COIN, ModifierTypeEnum.ADD, 100000)
            ]
        );
    }

    private static createSelfUpgradeItems() {
        ItemController.createItem(ItemIdEnum.SELF_OPEN_BUSINESS,
            ItemTypeEnum.TEMPORARY,
            'Open Business',
            'Expand your ways of money making. Change Odd Jobs into Manage Business and gains by x2',
            ItemMarketZone.SELF
        );
    }

}