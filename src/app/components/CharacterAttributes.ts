import { BaseAttributes } from "./BaseAttributes";

export class CharacterAttributes extends BaseAttributes {

    // qi is an attribute related to spells and power, 
    // and a main guideline for cultivation
    qiTotalCapacity: number;
    qiBaseCapacity: number;

    // body represents how strong is the character's body
    // helps guide some cultivation aspects
    bodyCapacity: number;

    // soul repesents how strong is the characte's soul
    // helps guide some cultivation aspects
    soul: number;

    // talent is a guide to how fast the character can grow
    // talent multiples Qi Capacity and every attribute Base Gain
    // more talent means faster growth
    talent: number;

    constructor() {
        super();
        this.qiTotalCapacity = 0;
        this.qiBaseCapacity = 0;
        this.bodyCapacity = 0;
        this.soul = 0;
        this.talent = 0;
    }
}