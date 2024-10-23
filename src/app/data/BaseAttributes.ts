
export class BaseAttributes {

    // qi is an attribute related to spells and power, 
    // and a main guideline for cultivation
    qi: number;

    // body represents how strong is the character's body
    // helps guide some cultivation aspects
    body: number;
    
    constructor(qi: number = 0, body: number = 0) {
        this.qi = qi;
        this.body = body;
    }
}