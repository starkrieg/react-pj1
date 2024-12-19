import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ExplorableZone } from "./ExplorableZone";
import { ErrorController } from "../utils/ErrorController";
import { AttributeTypeEnum } from "../character/AttributeTypeEnum";
import { ZoneLoot } from "./ZoneLoot";

export default class ZonePool {

    private static zonePool: ExplorableZone[] = [];

    static getZonePool() : Readonly<ExplorableZone[]> {
        return this.zonePool;
    }

    private static createExplorableZone(zoneEnum: ExploreZoneIdEnum,
        title: string, description: string, 
        zoneSize: number, basePower: number,
        unlockRequirements: (ItemIdEnum | ExploreZoneIdEnum)[],
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

        const zone = new ExplorableZone(
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

    static createZonePool() {
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_BACKALLEY,
            'Village Backalley',
            'Face off against punks and bullies',
            15,
            0.35,
            [ /* no requirements */],
            [ /* no rewards */ ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 75, 1),
                new ZoneLoot(AttributeTypeEnum.BODY, 25, 0.01)
            ],
            [ /* enemy names */
                'Punk',
                'Bully',
                'Creep'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_SOLDIERS_BOOTCAMP,
            'Village Soldiers Bootcamp',
            'Basic training with local soldiers',
            20,
            1,
            [ /* requirements */
                //ExploreZoneIdEnum.VILLAGE_BACKALLEY
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_PHYSICAL_TRAINING,
                ItemIdEnum.BOOK_INNER_REGION
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 10, 3),
                new ZoneLoot(AttributeTypeEnum.BODY, 50, 0.05)
            ],
            [ /* enemy names */
                'Punk',
                'Soldier',
                'Slacker'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_FIELDS,
            'Village Farm Fields',
            'Help cleaning the farm fields',
            10,
            2,
            [ /* requirements */
                //ExploreZoneIdEnum.VILLAGE_BACKALLEY
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_FORAGING_MANUAL
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 1, 5),
                new ZoneLoot(AttributeTypeEnum.BODY, 50, 0.03),
                new ZoneLoot(AttributeTypeEnum.QI, 1, 0.01)
            ],
            [ /* enemy names */
                'Pest',
                'Beast',
                'Rodent'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_FOREST_I,
            'Village Surrounding Forest',
            'Explore que forest surrounding the village',
            20,
            7,
            [ /* requirements */
                ItemIdEnum.BOOK_INNER_REGION
            ],
            [ /* no rewards */ ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 25, 5),
                new ZoneLoot(AttributeTypeEnum.BODY, 25, 0.05),
                new ZoneLoot(AttributeTypeEnum.QI, 10, 0.05)
            ],
            [ /* enemy names */
                'Bandit',
                'Beast'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_FOREST_II,
            'Village Deep Forest',
            'Explore que innermost part of the forest',
            35,
            15,
            [ /* requirements */
                ExploreZoneIdEnum.VILLAGE_FOREST_I
            ],
            [ /* no rewards */ ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 15, 3),
                new ZoneLoot(AttributeTypeEnum.BODY, 50, 0.05),
                new ZoneLoot(AttributeTypeEnum.QI, 15, 0.05)
            ],
            [ /* enemy names */
                'Bandit',
                'Beast',
                'Cultivator'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_FOREST_CAVE,
            'Hidden Forest Cave',
            'A cave hidden on the deepest parts of the forest',
            5,
            45,
            [ /* requirements */
                ExploreZoneIdEnum.VILLAGE_FOREST_II
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_QI_CULTIVATION
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 15, 10),
                new ZoneLoot(AttributeTypeEnum.BODY, 35, 0.1),
                new ZoneLoot(AttributeTypeEnum.QI, 25, 0.05)
            ],
            [ /* enemy names */
                'Cultivator',
                'Beast',
                'Young master'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.SMALL_SECT_ENTRANCE,
            'Small Sect - Entrance Trial',
            'A small sect is holding a trial to accept new disciples',
            5,
            15,
            [ /* requirements */
                ItemIdEnum.BOOK_INNER_REGION,
                ItemIdEnum.BOOK_QI_CULTIVATION
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_CULTIVATION_OF_SELF
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 25, 5),
                new ZoneLoot(AttributeTypeEnum.BODY, 25, 0.05),
                new ZoneLoot(AttributeTypeEnum.QI, 10, 0.05)
            ],
            [ /* enemy names */
                'Warrior',
                'Bully',
                'Cultivator'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.SMALL_SECT_OUTER,
            'Small Sect - Disciple Missions',
            'Perform missions for the sect and gain experience',
            100,
            25,
            [ /* requirements */
                ExploreZoneIdEnum.SMALL_SECT_ENTRANCE
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_MARTIAL_ARTS
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 50, 12),
                new ZoneLoot(AttributeTypeEnum.BODY, 75, 0.1),
                new ZoneLoot(AttributeTypeEnum.QI, 25, 0.1)
            ],
            [ /* enemy names */
                'Outer disciple',
                'Punk cultivator',
                'Beast'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.SMALL_SECT_INNER,
            'Small Sect - Disciple Competitions',
            'Compete against inner disciples',
            25,
            150,
            [ /* requirements */
                ExploreZoneIdEnum.SMALL_SECT_OUTER
            ],
            [ /* rewards */
                ItemIdEnum.BOOK_QI_MANIPULATION
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 75, 20),
                new ZoneLoot(AttributeTypeEnum.BODY, 75, 0.1),
                new ZoneLoot(AttributeTypeEnum.QI, 35, 0.1)
            ],
            [ /* enemy names */
                'Inner disciple',
                'Bully cultivator',
                'Young master'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.SMALL_SECT_CORE,
            'Small Sect - Elder\'s guidance',
            'Learn the core teachings directly from the elders',
            5,
            500,
            [ /* requirements */
                ExploreZoneIdEnum.SMALL_SECT_INNER
            ],
            [ /* rewards */
                ItemIdEnum.BOOK_BODY_REFINING
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 50, 50),
                new ZoneLoot(AttributeTypeEnum.BODY, 75, 1),
                new ZoneLoot(AttributeTypeEnum.QI, 50, 1)
            ],
            [ /* enemy names */
                'Young master',
                'Elder',
                'Core disciple'
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.MYRIAD_BEASTS_VALLEY,
            'Myriad Beasts Valley',
            'The home of many powerful beasts',
            1000,
            100,
            [ /* requirements */
                ItemIdEnum.BOOK_INNER_REGION
            ],
            [ /* rewards */
                ItemIdEnum.BOOK_OUTER_REGION
            ],
            [ /* zone loot */ 
                new ZoneLoot(AttributeTypeEnum.COIN, 25, 5),
                new ZoneLoot(AttributeTypeEnum.BODY, 75, 0.25),
                new ZoneLoot(AttributeTypeEnum.QI, 25, 0.25)
            ],
            [ /* enemy names */
                'Bandit',
                'Beast',
                'Cultivator',
                'Bully',
                'Mystical beast'
            ]
        );
    }

}