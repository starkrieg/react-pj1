/**
 * Central list of IDs for Items - things givem / learned / bought
 * Goal: make it easier to assign item IDs when creating, setting rewards, 
 * or checking if item in possession
 */
export enum ItemIdEnum {
    BOOK_QI_CULTIVATION = 'book-qi-cultivation' //controls the knowledge/ability to cultivate qi and break through
    ,BOOK_CULTIVATION_OF_SELF = 'bool-cultivation-of-self' //Book on meditation practices and inner mind
    ,BOOK_QI_MANIPULATION = 'book-qi-manipulation'//Teachings on achieving different effects with Qi
    ,BOOK_FORAGING_MANUAL = 'book-foraging-manual' //Book on plants and minerals
    ,BOOK_PHYSICAL_TRAINING = 'book-physical-training' //Teachings on strengthening one's body with exercise
    ,BOOK_BODY_REFINING = 'book-body-refining' //Teachings on going beyond the body's limits and breakthrough
    ,BOOK_MARTIAL_ARTS = 'book-martial-arts' //Teachings on combat techniques for increased survival
    ,BOOK_INNER_REGION = 'book-inner-region' //Knowledge on areas surrounding small village up to the myriad beast valley
    ,BOOK_OUTER_REGION = 'book-outer-region' //Knowledge on areas beyond the myriad beast valley
}