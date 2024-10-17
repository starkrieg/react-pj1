'use client'

import { BaseAttributes } from "../BaseAttributes";
import { Character } from "../Character";
import { RealmController } from "./RealmController";

class RealmMultiplier {

    id: string;
    action: string;
    value: number;

    constructor(id: string, action: string, value: number) {
        this.id = id;
        this.action = action;
        this.value = value;
    }

}

export class Realm {

    id: string;
    title: string;
    requirements: BaseAttributes;
    breakMultipliers: RealmMultiplier[];
    desc: string;

    constructor(id: string, title: string, 
        requirements: BaseAttributes, 
        breakMultipliers: RealmMultiplier[],
        desc: string = 'Lorem ipsum'
    ) {
        this.id = id;
        this.title = title;
        this.desc = desc
        this.requirements = requirements;
        this.breakMultipliers = breakMultipliers
        
    }

    createRealmMultiplier(id: string, action: string, value: number) {
        return new RealmMultiplier(id, action, value);
    }

    getNextRealm() {
        return RealmController.getRealmById('unknown');
    }

    doRealmUp(character: Character) {
        if (this.id == 'unknown') {
            alert("You don\'t know how to move forward!")
            return;
        }
        for (let index = 0; index < this.breakMultipliers.length; index++) {
            const multi = this.breakMultipliers[index];
            switch (multi.id) {
                case 'qi-capacity':
                    if (multi.action == 'sum') {
                        const newQiBaseMinCapacity = character.attributes.qiBaseMinCapacity + multi.value
                        character.setBaseMinCapacity(newQiBaseMinCapacity);
                    }
                    if (multi.action == 'multi') {
                        /* multi is for major realms */
                        /* multiply original multi.value by the character foundation first */
                        const foundationMulti = character.getBodyCapPercent() * character.getQiCapPercent();
                        const finalMulti = multi.value * foundationMulti
                        const newQiBaseMinCapacity = character.attributes.qiBaseMinCapacity * finalMulti
                        character.setBaseMinCapacity(newQiBaseMinCapacity);
                    }
                    break;
                case 'body-capacity':
                    if (multi.action == 'sum') {
                        character.attributes.bodyCapacity += multi.value
                    }
                    break;
                case 'lifespan':
                    if (multi.action == 'sum') {
                        character.maxAge += multi.value
                    }
                    break;
                default:
                    console.log('Realm multiplier for {0} {1} {2}', multi.id, multi.action, multi.value);
                    alert('Something happened while breaking through! Please report this');
            }
        }
        character.realm = this.getNextRealm();
    }
}