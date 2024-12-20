import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { ZoneRegionEnum } from "../exploration/ZoneRegionEnum";
import { Event } from "./Event";
import { EventController } from "./EventController";
import { EventMilestone } from "./EventMilestone";

export class EventCreator {

    static createEvents() {
        EventController.addEvent(
            new Event(
                [ /* milestones */
                    new EventMilestone(615,
                        `Rumors spread that an uncommonly strong beast appeared in the Myriad Beasts Valley. This event spreads across the Calm Wind region. 
                        Wild areas have increased activity. 
                        Calm Wind Sect has increased activity.`,
                        1.25, //25% difficulty increase
                        [/* affected zones */
                            ZoneIdEnum.VILLAGE_FIELDS,
                            ZoneIdEnum.VILLAGE_FOREST_I,
                            ZoneIdEnum.VILLAGE_FOREST_II,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_I,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_II,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_III,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_IV,
                            ZoneIdEnum.CALM_WIND_SECT_ENTRANCE,
                            ZoneIdEnum.CALM_WIND_SECT_OUTER,
                            ZoneIdEnum.CALM_WIND_SECT_INNER,
                            ZoneIdEnum.CALM_WIND_SECT_CORE,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_I,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_II,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_III,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_IV,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_V,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_HIDDEN_PATH
                        ],
                        [/* not regions blocked */]
                    ),
                    new EventMilestone(630,
                        `Loud rumbling comes from the Myriad Beasts Valley before a bolt of lightning hits the mountain. The tension rises on the Calm Wind region. 
                        Village areas have increased activity. 
                        Wild areas have increased activity. 
                        Sect areas have increased activity.`,
                        1.50, //50% difficulty increase
                        [/* affected zones */
                            ZoneIdEnum.VILLAGE_BACKALLEY,
                            ZoneIdEnum.VILLAGE_SOLDIERS_BOOTCAMP,
                            ZoneIdEnum.VILLAGE_FIELDS,
                            ZoneIdEnum.VILLAGE_FOREST_I,
                            ZoneIdEnum.VILLAGE_FOREST_II,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_I,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_II,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_III,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_IV,
                            ZoneIdEnum.CALM_WIND_SECT_ENTRANCE,
                            ZoneIdEnum.CALM_WIND_SECT_OUTER,
                            ZoneIdEnum.CALM_WIND_SECT_INNER,
                            ZoneIdEnum.CALM_WIND_SECT_CORE,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_I,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_II,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_III,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_IV,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_V,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_HIDDEN_PATH
                        ],
                        [/* no regions blocked */]
                    ),
                    new EventMilestone(645,
                        `The earth shakes across the Calm Wind region. A sea of beasts leave the valley and expand throught the region with incredible ferocity. The Calm Wind Sect cannot protect itself and falls to the beast horde. The village is overtaken soon after, and not much remains. Only a few people were able to keep their lives.
                        Village areas are unaccessible
                        Calm Wind Sect areas are unaccessible
                        Respective markets are unaccessible`,
                        1.50, //50% difficulty increase
                        [/* affected zones */
                            ZoneIdEnum.VILLAGE_FOREST_I,
                            ZoneIdEnum.VILLAGE_FOREST_II,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_I,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_II,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_III,
                            ZoneIdEnum.VILLAGE_FOREST_CAVE_IV,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_I,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_II,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_III,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_IV,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_V,
                            ZoneIdEnum.MYRIAD_BEASTS_VALLEY_HIDDEN_PATH
                        ],
                        [/* regions blocked */
                            ZoneRegionEnum.CALM_WIND_VILLAGE,
                            ZoneRegionEnum.CALM_WIND_SECT
                        ]
                    )
                ],
                ZoneIdEnum.MYRIAD_BEASTS_VALLEY_V, //endzone for event
                'You defeated an uncommonly powerful beast. Its potential was enough to shake the region, but alas, it was not given enough time.',
                'You defeated the king of the beast horde and stopped their expansion. All those who died can feel avenged. Even so, this region won\'t be livable again anytime soon.'
            )
        );
    }

}