import { ExploreZoneIdEnum } from "./ExploreZoneIdEnum";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ExplorableZone } from "./ExplorableZone";
import { ErrorController } from "../utils/ErrorController";

export default class ZonePool {

    private static zonePool: ExplorableZone[] = [];

    static getZonePool() : Readonly<ExplorableZone[]> {
        return this.zonePool;
    }

    private static createExplorableZone(zoneEnum: ExploreZoneIdEnum,
        title: string, description: string, 
        zoneSize: number, minimumPowerRequired: number,
        unlockRequirements: (ItemIdEnum | ExploreZoneIdEnum)[],
        listClearRewardItemId: ItemIdEnum[]
    ) {
        // error when:
        // zone, title, description or item reward is undefined/empty
        // zone size is equal or below 0
        // minimum power required is below 0
        if (!title || !description || zoneSize <= 0 || minimumPowerRequired < 0 || !listClearRewardItemId) {
            ErrorController.throwSomethingWrongError();
            return;
        }

        const zone = new ExplorableZone(
            zoneEnum,
            title,
            description,
            zoneSize,
            minimumPowerRequired,
            unlockRequirements,
            listClearRewardItemId
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
            [ /* no rewards */ ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_SOLDIERS_BOOTCAMP,
            'Village Soldiers Bootcamp',
            'Basic training with local soldiers',
            20,
            1,
            [ /* requirements */
                ExploreZoneIdEnum.VILLAGE_BACKALLEY
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_PHYSICAL_TRAINING,
                ItemIdEnum.BOOK_INNER_REGION
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_FIELDS,
            'Village Farm Fields',
            'Help cleaning the farm fields',
            10,
            2,
            [ /* requirements */
                ExploreZoneIdEnum.VILLAGE_BACKALLEY
            ],
            [ /* rewards */ 
                ItemIdEnum.BOOK_FORAGING_MANUAL
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
            [ /* no rewards */ ]
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
            [ /* no rewards */ ]
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
            ]
        );
        this.createExplorableZone(
            ExploreZoneIdEnum.MYRIAD_BEASTS_VALLEY,
            'Small Sect - Elder\'s guidance',
            'Learn the core teachings directly from the elders',
            5,
            500,
            [ /* requirements */
                ItemIdEnum.BOOK_INNER_REGION
            ],
            [ /* rewards */
                ItemIdEnum.BOOK_OUTER_REGION
            ]
        );
    }

}