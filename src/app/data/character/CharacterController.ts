import { ItemController } from "../items/ItemController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { ErrorController } from "../utils/ErrorController";
import { Character } from "./Character";

export class CharacterController {

    private static character: Character = new Character();

    private static isBreakthroughReady: boolean = false;
    static nextRealmId = '';

    //TODO - make a better way to retrieve necessary character data for the UI
    //TODO - make an easier way to get any character attribute
    /**
     * Returns inner character object
     * But its purely readonly
     * To modify the character, use the available methods on the controller
     * @returns readonly character instance
     */
    static getCharacter() : Readonly<Character> {
        return this.character;
    }
  
    //TODO - make this a more generic incrementor of character attributes
    static increaseQi(value: number) {
        this.character.increaseQi(value);
    }

    //TODO - make this a more generic incrementor of character attributes
    static increaseBody(value: number) {
        this.character.increaseBody(value);
    }

    //TODO - make this a more generic incrementor of character attributes
    static increaseMoney(value: number) {
        this.character.increaseMoney(value)
    }

    /**
     * Character current total power
     * 
     */
    static getCharacterPower() {
        return this.character.getPower();
    }
    
    /**
     * Remove item from character.
     * Will throw error if the character did not have the item.
     * @param itemId 
     */
    static removeItem(itemId: ItemIdEnum) {
        //remove the item, and check if worked
        //if item did not exist, might be an issue
        if (!this.character.itemList.delete(itemId)) {
            ErrorController.throwSomethingWrongError();
        }
    }
    
    /**
     * Checks if character has the item
     * @param itemId item id
     * @returns 
     */
    static isHaveItem(itemId: ItemIdEnum) {
        return this.character.itemList.has(itemId);
    }
    
    /**
     * Gives the item to the character.
     * Character only holds the item id, not the whole item definition
     * @param itemId item id
     */
    static giveItem(itemId: ItemIdEnum | undefined) {
        if (itemId) {
            this.character.itemList.add(itemId);
        } else {
            ErrorController.throwSomethingWrongError();
        }
    }
    
    /**
    * Reset values on game start or game hard reset
    */
    static startFirstCharacter() {
        this.character.itemList = new Set<ItemIdEnum>();
        this.character.resetDefaultValues();
    } 

    static getDeathNumber() {
        return this.character.deaths
    }

    static getItemList() {
        return this.character.itemList;
    }

    /**
     * Increments character age by 1
     * @returns boolean if character reached max age
     */
    static add1YearCharacter() : boolean {
        this.character.year += 1
        return (this.character.year >= this.character.maxAge);
    }

    static reviveCharacter() {
        //count new death
        this.character.deaths++;
        //reset to starting values
        this.character.resetDefaultValues();
        //remove non-permanent character items
        this.removeNonPermanentItems();
        //apply permanent upgrades
    }

    private static removeNonPermanentItems() {
        const itemList = Array.from(this.character.itemList);
        itemList.map(itemId => ItemController.getItemById(itemId))
        .filter(item => item != undefined)
        .filter(item => item.type != ItemTypeEnum.PERMANENT)        
        .forEach(item => {
            this.removeItem(item.id);
        });
    }

    static breakthroughRealm() {
        if (this.isBreakthroughReady) {
            this.character.realm!.doRealmUp(this.character);
            this.isBreakthroughReady = false;
        }
    }

    static getListRequirementBreakthrough(char: Readonly<Character>) {
        this.isBreakthroughReady = false;
        
        if (this.nextRealmId == 'unknown') {
          return [];
        }
    
        const nextRealm = char.realm!.getNextRealm();
    
        if (!nextRealm || nextRealm.id == 'unknown') {
          return [];
        }
    
        const prepList = [];
    
        const qiReqFilled = (char.getQi() >= nextRealm.requirements.qi);
        if (nextRealm.requirements.qi > 0) {
            prepList.push({
                reqName: 'qi',
                reqValue: nextRealm.requirements.qi,
                isReqFulfilled: qiReqFilled
            });
        }
    
        const bodyReqFilled = (char.getBody() >= nextRealm.requirements.body);
        if (nextRealm.requirements.body > 0) {
   
            prepList.push({
                reqName: 'body', 
                reqValue: nextRealm.requirements.body, 
                isReqFulfilled: bodyReqFilled
            });
        }
    
        this.isBreakthroughReady = qiReqFilled && bodyReqFilled;
    
        return prepList;
      }

}