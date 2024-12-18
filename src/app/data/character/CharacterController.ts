import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ItemController } from "../items/ItemController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { RealmEnum } from "../realms/RealmEnum";
import { ErrorController } from "../utils/ErrorController";
import { Character } from "./Character";

export class CharacterController {

    private static character: Character = new Character();

    private static isBreakthroughReady: boolean = false;
    static nextRealmId = '';

    //death count outside character current life
    private static deathCount = 0;

    //count for amount of fights fought - wins and losses
    private static fightTotalCount = 0;

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
        return this.character.getFightingPower();
    }
    
    /**
     * Remove item from character.
     * Will throw error if the character did not have the item.
     * @param itemId 
     */
    static removeItem(itemId: ItemIdEnum | ExploreZoneIdEnum) {
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
    static isHaveItem(itemId: ItemIdEnum | ExploreZoneIdEnum) {
        return this.character.itemList.has(itemId);
    }
    
    /**
     * Gives the item to the character.
     * Character only holds the item id, not the whole item definition
     * @param itemId item id
     */
    static giveItem(itemId: ItemIdEnum | ExploreZoneIdEnum | undefined) {
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
        CharacterController.increaseDeathCount();
        //reset to starting values
        this.character.resetDefaultValues();
        //remove non-permanent character items
        this.removeZoneItems();
        this.removeNonPermanentItems();
        //apply permanent upgrades
    }

    private static isItemZone(value: ItemIdEnum | ExploreZoneIdEnum) {
            return Object.values(ExploreZoneIdEnum).includes(value as ExploreZoneIdEnum)
    }

    private static removeZoneItems() {
        const itemList = Array.from(this.character.itemList);
        itemList.filter(item => this.isItemZone(item))
        .forEach(item => {
            this.removeItem(item);
        });
    }

    private static removeNonPermanentItems() {
        const itemList = Array.from(this.character.itemList);
        itemList.filter(item => !this.isItemZone(item))
        .map(itemId => ItemController.getItemById(itemId as ItemIdEnum))
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
        
        if (this.nextRealmId == RealmEnum.UNKNOWN) {
          return [];
        }
    
        const nextRealm = char.realm!.getNextRealm();
    
        if (!nextRealm || nextRealm.id == RealmEnum.UNKNOWN) {
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

      static getDeathCount() {
        return this.deathCount;
      }

      static increaseDeathCount() {
        this.deathCount++;
      }

      static getFightingPower() {
        return this.character.getFightingPower();
      }

      static incrementFightCount() {
        this.fightTotalCount++;
      }

      static getFightCount() : Readonly<number> {
        return this.fightTotalCount;
      }

      static getFightingStatus() {
        return this.character.fightingExperience.getLevelStatus();
      }

      static getFightingLevel() {
        return this.character.fightingExperience.getLevel();
      }

      static incrementFightExperience(value: number) {
        this.character.fightingExperience.addFightingExperience(value);
      }

}