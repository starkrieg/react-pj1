import { ZoneIdEnum } from "./ZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { Zone } from "./Zone";
import { ErrorController } from "../utils/ErrorController";
import { ZoneLoot } from "./ZoneLoot";
import { ExplorationController } from "./ExplorationController";
import { ZoneRegion } from "./ZoneRegion";
import { ZoneRegionEnum } from "./ZoneRegionEnum";

export default class ZonePool {

    private static zonePool: Zone[] = [];

    static getZonePool() : Readonly<Zone[]> {
        return this.zonePool;
    }

    private static createExplorableZone(zoneEnum: ZoneIdEnum,
        title: string, description: string, 
        basePower: number, zoneSize: number,
        unlockRequirements: (ItemIdEnum | ZoneIdEnum)[],
        listClearRewardItemId: ItemIdEnum[],
        lootList: ZoneLoot[],
        enemyList: string[]
    ) {
        // error when:
        // zone, title, description or item reward is undefined/empty
        // zone size is equal or below 0
        // minimum power required is below 0
        if (!title || !description || zoneSize <= 0 || basePower < 0 || !listClearRewardItemId) {
            ErrorController.throwSomethingWrongError();
            return;
        }

        const zone = new Zone(
            zoneEnum,
            title,
            description,
            zoneSize,
            basePower,
            unlockRequirements,
            listClearRewardItemId,
            lootList,
            enemyList
        );

        this.zonePool.push(zone);

    }

    private static createCalmWindVillageRegion() {
        ExplorationController.addRegion(new ZoneRegion(ZoneRegionEnum.CALM_WIND_VILLAGE, 
            [
                ZoneIdEnum.VILLAGE_BACKALLEY,
                ZoneIdEnum.VILLAGE_SOLDIERS_BOOTCAMP,
                ZoneIdEnum.VILLAGE_FIELDS
            ])
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_BACKALLEY,
            'Village Backalley',
            'Face off against punks and bullies',
            5,
            25,
            [ /* no requirements */],
            [ /* rewards */ 
                ItemIdEnum.POUCH_OF_COINS_M
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_S, 1), //1%
            ],
            [ /* enemy names */
                'Punk',
                'Bully',
                'Creep'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_FIELDS,
            'Village Farm Fields',
            'Help cleaning the farm fields',
            15,
            15,
            [ /* no requirements */ ],
            [ /* rewards */ 
                ItemIdEnum.POUCH_OF_COINS_M
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.PILL_STRENGTH_ELIXIR, 1), //1%
                new ZoneLoot(ItemIdEnum.BOOK_FORAGING_MANUAL, 0.5, 1), //0.5% of getting 1
            ],
            [ /* enemy names */
                'Pest',
                'Beast',
                'Rodent'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_SOLDIERS_BOOTCAMP,
            'Village Soldiers Bootcamp',
            'Basic training with local soldiers',
            35,
            35,
            [ /* requirements */ 
                ZoneIdEnum.VILLAGE_FIELDS
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_PHYSICAL_TRAINING
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.PILL_STRENGTH_ELIXIR, 1), //1%
            ],
            [ /* enemy names */
                'Punk',
                'Soldier',
                'Slacker'
            ]
        );
    }

    private static createCalmWindForestRegion() {
        ExplorationController.addRegion(new ZoneRegion(ZoneRegionEnum.CALM_WIND_FOREST, 
            [
                ZoneIdEnum.VILLAGE_FOREST_I,
                ZoneIdEnum.VILLAGE_FOREST_II,
                ZoneIdEnum.VILLAGE_FOREST_CAVE_I,
                ZoneIdEnum.VILLAGE_FOREST_CAVE_II,
                ZoneIdEnum.VILLAGE_FOREST_CAVE_III,
                ZoneIdEnum.VILLAGE_FOREST_CAVE_IV
            ])
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_FOREST_I,
            'Village Surrounding Forest',
            'Forest surrounding the village',
            50,
            45,
            [ /* no requirements */ ],
            [ /* rewards */ 
                ItemIdEnum.POUCH_OF_COINS_S
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_S, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.PILL_STRENGTH_ELIXIR, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.PILL_QI_BOOST_I, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Bandit',
                'Beast'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_FOREST_II,
            'Village Deep Forest',
            'Innermost part of the forest',
            75,
            65,
            [ /* requirements */
                ZoneIdEnum.VILLAGE_FOREST_I
            ],
            [ /* rewards */ 
                ItemIdEnum.POUCH_OF_COINS_M
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_S, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.PILL_STRENGTH_ELIXIR, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_1Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Bandit',
                'Beast',
                'Cultivator'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_FOREST_CAVE_I,
            'Hidden Forest Cave',
            'A cave hidden on the deepest parts of the forest',
            350,
            35,
            [ /* requirements */
                ZoneIdEnum.VILLAGE_FOREST_II
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_MEDITATE_ON_SELF
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_M, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_1Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Cultivator',
                'Beast',
                'Young master'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_FOREST_CAVE_II,
            'Forest cave - 2nd layer',
            'A cave hidden on the deepest parts of the forest',
            30000,
            65,
            [ /* requirements */
                ZoneIdEnum.VILLAGE_FOREST_CAVE_I
            ],
            [ /* rewards */ 
                ItemIdEnum.SNOW_GINSENG_100Y
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_M, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_10Y, 0.25), //1%
                new ZoneLoot(ItemIdEnum.BOOK_PATH_OF_PERFECTION, 0.15, 1), //0.15% of 1
            ],
            [ /* enemy names */
                'Cultivator',
                'Beast',
                'Young master'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_FOREST_CAVE_III,
            'Forest cave - 3rd layer',
            'A cave hidden on the deepest parts of the forest',
            90000,
            85,
            [ /* requirements */
                ZoneIdEnum.VILLAGE_FOREST_CAVE_II
            ],
            [ /* rewards */ 
                ItemIdEnum.SNOW_GINSENG_1000Y
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_G, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_10Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_100Y, 0.10), //0.15%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_100Y, 0.15), //0.15%
            ],
            [ /* enemy names */
                'Cultivator',
                'Beast',
                'Young master'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.VILLAGE_FOREST_CAVE_IV,
            'Forest cave - 4th layer',
            'A cave hidden on the deepest parts of the forest',
            200000,
            1000,
            [ /* requirements */
                ZoneIdEnum.VILLAGE_FOREST_CAVE_III
            ],
            [ /* rewards */ 
                ItemIdEnum.SNOW_GINSENG_1000Y,
                ItemIdEnum.BLOOD_GINSENG_1000Y
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_G, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.GOLD_PIECE_S, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_100Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_100Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Cultivator',
                'Beast',
                'Young master'
            ]
        );
    }

    private static createCalmWindSectRegion() {
        ExplorationController.addRegion(new ZoneRegion(ZoneRegionEnum.CALM_WIND_SECT, 
            [
                ZoneIdEnum.CALM_WIND_SECT_ENTRANCE,
                ZoneIdEnum.CALM_WIND_SECT_OUTER,
                ZoneIdEnum.CALM_WIND_SECT_INNER,
                ZoneIdEnum.CALM_WIND_SECT_CORE
            ])
        );
        this.createExplorableZone(
            ZoneIdEnum.CALM_WIND_SECT_ENTRANCE,
            'Calm Wind Sect - Entrance Trials',
            'A series of trials to become a sect disciple',
            75,
            5,
            [ /* no requirements */ ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_QI_CULTIVATION
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_S, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_1Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_1Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Warrior',
                'Bully',
                'Cultivator'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.CALM_WIND_SECT_OUTER,
            'Calm Wind Sect - Disciple Missions',
            'Perform missions for the sect and gain experience',
            200,
            100,
            [ /* requirements */
                ZoneIdEnum.CALM_WIND_SECT_ENTRANCE
            ],
            [ /* rewards */ 
                ItemIdEnum.PILL_QI_BOOST_III
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_M, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_1Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_10Y, 0.10), //0.10%
                new ZoneLoot(ItemIdEnum.BOOK_MARTIAL_ARTS, 0.15, 1) //0.15% of getting 1
            ],
            [ /* enemy names */
                'Outer disciple',
                'Punk cultivator',
                'Beast'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.CALM_WIND_SECT_INNER,
            'Calm Wind Sect - Disciple Competitions',
            'Compete against inner disciples',
            8000,
            50,
            [ /* requirements */
                ZoneIdEnum.CALM_WIND_SECT_OUTER
            ],
            [ /* rewards */
                ItemIdEnum.BOOK_QI_SPELLS
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_M, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_10Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_100Y, 0.10), //0.10%
            ],
            [ /* enemy names */
                'Inner disciple',
                'Bully cultivator',
                'Young master'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.CALM_WIND_SECT_CORE,
            'Calm Wind Sect - Elder\'s guidance',
            'Learn the core teachings directly from the elders',
            35000,
            25,
            [ /* requirements */
                ZoneIdEnum.CALM_WIND_SECT_INNER
            ],
            [ /* rewards */
                ItemIdEnum.SNOW_GINSENG_1000Y
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_G, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_100Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Young master',
                'Elder',
                'Core disciple'
            ]
        );
    }

    private static createCalmWindValleyRegion() {
        ExplorationController.addRegion(new ZoneRegion(ZoneRegionEnum.CALM_WIND_VALLEY, 
            [
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_I,
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_II,
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_III,
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_IV,
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_V,
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_HIDDEN_PATH,
            ])
        );
        this.createExplorableZone(
            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_I,
            'Myriad Beasts Valley - Outer layer',
            'The home of many powerful beasts and great resources',
            1000,
            35,
            [ /* no requirements */ ],
            [ /* rewards */
                ItemIdEnum.SNOW_GINSENG_10Y,
                ItemIdEnum.BLOOD_GINSENG_10Y
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_M, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_1Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_1Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Bandit',
                'Beast',
                'Cultivator',
                'Bully',
                'Mystical beast'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_II,
            'Myriad Beasts Valley - 2nd layer',
            'The home of many powerful beasts and great resources',
            23000,
            45,
            [ /* requirements */ 
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_I
            ],
            [ /* rewards */
                ItemIdEnum.SNOW_GINSENG_100Y,
                ItemIdEnum.BLOOD_GINSENG_100Y
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_M, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_10Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_10Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Bandit',
                'Beast',
                'Cultivator',
                'Mystical beast'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_III,
            'Myriad Beasts Valley - 3rd layer',
            'The home of many powerful beasts and great resources',
            32000,
            65,
            [ /* requirements */ 
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_II
            ],
            [ /* rewards */
                ItemIdEnum.SNOW_GINSENG_1000Y,
                ItemIdEnum.BLOOD_GINSENG_1000Y
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_G, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_100Y, 0.25), //1%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_100Y, 0.25), //1%
            ],
            [ /* enemy names */
                'Bandit',
                'Beast',
                'Cultivator',
                'Mystical beast'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_IV,
            'Myriad Beasts Valley - 4th layer',
            'The home of many powerful beasts and great resources',
            620000,
            75,
            [ /* requirements */ 
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_III
            ],
            [ /* rewards */
                ItemIdEnum.SNOW_GINSENG_1000Y,
                ItemIdEnum.BLOOD_GINSENG_1000Y,
                ItemIdEnum.GOLD_PIECE_S
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_G, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_100Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_100Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.GOLD_PIECE_S, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_1000Y, 0.10), //0.10%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_1000Y, 0.10), //0.10%
            ],
            [ /* enemy names */
                'Beast',
                'Cultivator',
                'Mystical beast'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_V,
            'Myriad Beasts Valley - Core layer',
            'The home of many powerful beasts and great resources',
            1000000,
            100,
            [ /* requirements */ 
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_IV
            ],
            [ /* rewards */
                ItemIdEnum.BOOK_VALLEY_SECRET_PATH,
                ItemIdEnum.BOOK_BODY_CULTIVATION,
                ItemIdEnum.GOLD_PIECE_S
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.GOLD_PIECE_S, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_1000Y, 0.25), //1%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_1000Y, 0.25), //1%
            ],
            [ /* enemy names */
                'Cultivator',
                'Mystical beast'
            ]
        );
        this.createExplorableZone(
            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_HIDDEN_PATH,
            'Myriad Beasts Valley - Hidden Path',
            'A hidden pathway across the valley',
            40000,
            45,
            [ /* requirements */ 
                ItemIdEnum.BOOK_VALLEY_SECRET_PATH
            ],
            [ /* rewards */
                ItemIdEnum.SNOW_GINSENG_100Y,
                ItemIdEnum.BLOOD_GINSENG_100Y,
                ItemIdEnum.GOLD_PIECE_S
            ],
            [ /* zone loot */ 
                new ZoneLoot(ItemIdEnum.POUCH_OF_COINS_G, 0.5), //0.5%
                new ZoneLoot(ItemIdEnum.SNOW_GINSENG_100Y, 0.25), //0.25%
                new ZoneLoot(ItemIdEnum.BLOOD_GINSENG_100Y, 0.25), //0.25%
            ],
            [ /* enemy names */
                'Cultivator',
                'Mystical beast'
            ]
        );
    }

    static createZonePool() {
        //calm wind region areas
        this.createCalmWindVillageRegion();
        this.createCalmWindForestRegion();
        this.createCalmWindSectRegion();
        this.createCalmWindValleyRegion();
    }

}