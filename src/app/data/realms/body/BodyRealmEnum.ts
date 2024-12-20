/**
 * Central list of IDs for cultivation realms
 * Based on https://martial-world.fandom.com/wiki/Cultivation/Body_Transformation
 */
export enum BodyRealmEnum {
    UNKNOWN = 'unknown' // unknown realm for cases where progress has not been unlocked or developed in the game    
    ,MORTAL = 'mortal' // basic realm for game start
    // body realms
    // first great realm of body cultivation
    ,REFINE_BODY_1 = 'refine-strength'
    ,REFINE_BODY_2 = 'refine-flesh' 
    ,REFINE_BODY_3 = 'refine-viscera' 
    ,REFINE_BODY_4 = 'refine-muscles' 
    ,REFINE_BODY_5 = 'refine-bones'
    ,REFINE_BODY_6 = 'refine-pulse'
    ,REFINE_BODY_7 = 'refine-marrow'
    ,REFINE_BODY_8 = 'refine-marrow-2' // perfect rare substage
    ,REFINE_BODY_9 = 'refine-marrow-3' // perfect rare substage
    // second great realm - 8 hidden gates
    // third great realm - 9 stars dao palace
}