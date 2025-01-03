/**
 * Central list of IDs for Items - things givem / learned / bought
 * Goal: make it easier to assign item IDs when creating, setting rewards, 
 * or checking if item in possession
 */
export enum ItemIdEnum {
    // self temporary upgrades 
    SELF_OPEN_BUSINESS = 'self-open-business' //increases money gain and unlocks other stuff
    // permanent zone items
    ,BOOK_QI_CULTIVATION = 'book-qi-cultivation' //controls the knowledge/ability to cultivate qi and break through
    ,BOOK_MEDITATE_ON_SELF = 'bool-meditate-on-self' //Book on meditation practices and inner mind
    ,BOOK_QI_SPELLS = 'book-qi-spells' //Teachings on achieving different effects with Qi
    ,BOOK_FORAGING_MANUAL = 'book-foraging-manual' //Book on plants and minerals
    ,BOOK_PHYSICAL_TRAINING = 'book-physical-training' //Teachings on strengthening one's body with exercise
    ,BOOK_BODY_CULTIVATION = 'book-body-cultivation' //Teachings on going beyond the body's limits and breakthrough
    ,BOOK_MARTIAL_ARTS = 'book-martial-arts' //Teachings on combat techniques for increased survival
    ,BOOK_VALLEY_SECRET_PATH = 'book-valley-secret-path' //Knowledge on passing through the myriad beasts valley with more ease
    ,BOOK_HEAVENS_EYE = 'book-heavens-eye' //Knowledge on cultivating the Heaven's Eye - allows to see Talent and increases dodge and hit chance, and reduces damage
    ,BOOK_PATH_OF_PERFECTION = 'book-path-of-perfection' //Knowledge on achieving perfect foundation for energy realms
    // calm wind village region market items
    ,BOOK_NOTES_ON_PEOPLE = 'book-notes-on-people' //Knowledge on village location, people and commerce
    ,BOOK_SHOPKEEPING_MANUAL = 'book-shopkeeping-manual' //Knowledge on finances and profits for business
    ,BOOK_CONFUCIAN_SCRIPTURES_I = 'book-confucian-scriptures-i' //Confucian texts on philosophy and life
    ,WEAPON_IRON_BLADE = 'weapon-iron-blade' // tier 1 mortal weapon
    ,ARMOR_LEATHER_VEST = 'armor-leather-vest' // tier 1 mortal armor
    ,HIRE_WARRIOR_I = 'hire-warrior-i' // ally 1
    ,ITEM_IRON_WEIGHTS = 'item-iron-weights' // activity upgrade
    ,ITEM_WORKING_TOOLS = 'item-working-tools' // activity upgrade
    ,PILL_POOR_HEALING = 'pill-poor-healing' // tier 1 - internal damage / health heal
    ,PILL_QI_BOOST_I = 'pill-qi-boost-i' // tier 1 - boost internal qi 
    ,PILL_STRENGTH_ELIXIR = 'pill-strength-elixir' // boost body a very small amount
    // calm wind sect region market items
    ,BOOK_TAOIST_SCRIPTURES_I = 'book-taoist-scriptures-i' //Taoist texts on philosophy and life
    ,BOOK_UNDERHANDED_METHODS_I = 'book-underhanded-methods-i' //Knowledge on underhanded ways to make money
    ,WEAPON_FLYING_SWORD_I = 'weapon-flying-sword-i' // tier 1 immortal weapon
    ,ARMOR_SPIRITUAL_SILK_I = 'armor-spiritual-silk-i' // tier 1 immortal armor
    ,WEAPON_FLYING_SWORD_II = 'weapon-flying-sword-ii' // tier 2 immortal weapon
    ,ARMOR_SPIRITUAL_SILK_II = 'armor-spiritual-silk-ii' // tier 2 immortal armor
    ,WEAPON_FLYING_SWORD_III = 'weapon-flying-sword-iii' // tier 3 immortal weapon
    ,ARMOR_SPIRITUAL_SILK_III = 'armor-spiritual-silk-iii' // tier 3 immortal armor
    ,HIRE_CULTIVATOR_I = 'hire-cultivator-i' // ally 2
    ,HIRE_CULTIVATOR_II = 'hire-cultivator-ii' // ally 3
    ,HIRE_CULTIVATOR_III = 'hire-cultivator-iii' // ally 4
    ,ITEM_MYSTIC_INCENSE = 'item-mystic-incense' // activity upgrade
    ,ITEM_CULTIVATION_MAT = 'item-cultivation-mat' // activity upgrade
    ,PILL_AVERAGE_HEALING = 'pill-average-healing' // tier 2 - internal damage / health heal
    ,PILL_QI_BOOST_II = 'pill-qi-boost-ii' // tier 2 - boost internal qi
    ,PILL_QI_BOOST_III = 'pill-qi-boost-iii' // tier 3 - boost internal qi
    // general droppable zone items
    ,SNOW_GINSENG_1Y = 'snow-ginseng-1y'
    ,SNOW_GINSENG_10Y = 'snow-ginseng-10y'
    ,SNOW_GINSENG_100Y = 'snow-ginseng-100y'
    ,SNOW_GINSENG_1000Y = 'snow-ginseng-1000y'
    ,BLOOD_GINSENG_1Y = 'blood-ginseng-1y'
    ,BLOOD_GINSENG_10Y = 'blood-ginseng-10y'
    ,BLOOD_GINSENG_100Y = 'blood-ginseng-100y'
    ,BLOOD_GINSENG_1000Y = 'blood-ginseng-1000y'
    ,POUCH_OF_COINS_S = 'pouch-of-coins-s'
    ,POUCH_OF_COINS_M = 'pouch-of-coins-m'
    ,POUCH_OF_COINS_G = 'pouch-of-coins-g'
    ,GOLD_PIECE_S = 'gold-piece-s'
}