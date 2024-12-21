import { ExploreZoneIdEnum } from "../exploration/ExploreZoneIdEnum";
import { ItemController } from "../items/ItemController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { RealmEnum } from "../realms/RealmEnum";
import { ErrorController } from "../utils/ErrorController";
import { AttributeTypeEnum } from "./AttributeTypeEnum";
import { Character } from "./Character";

export class CharacterController {

    private static character: Character = new Character();

    private static isBreakthroughReady: boolean = false;

    //death count outside character current life
    private static deathCount = 0;

    //count for amount of fights fought - wins and losses
    private static fightTotalCount = 0;

    /**
     * Returns inner character object
     * But its purely readonly
     * To modify the character, use the available methods on the controller
     * @returns readonly character instance
     */
    static getCharacter() : Readonly<Character> {
        return this.character;
    }
  
    static increaseAttribute(attribute: AttributeTypeEnum, value: number) {
        this.character.increaseAttribute(attribute, value);
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
    static resetToGameStart() {
      this.character.resetToGameStart()
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
        return (this.character.year >= this.character.getAttributeValue(AttributeTypeEnum.LIFESPAN));
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
    
        const nextRealm = char.realm.getNextRealm();
    
        if (nextRealm.id == RealmEnum.UNKNOWN) {
          return [];
        }
    
        const prepList: any[] = [];

        nextRealm.requirements.forEach(req => {
          prepList.push({
              reqName: req.id,
              reqValue: req.value,
              isReqFulfilled: (char.getAttributeValue(req.id) >= req.value)
          });
        });

        this.isBreakthroughReady = prepList.every(req => req.isReqFulfilled);
    
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

      static getHealth() {
        return this.character.getHealth();
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

      static recoverInternalInjury() {
        const internalDamage = this.character.getAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE)
        if (internalDamage > 0) {
            const RECOVERY_MOD = 15;
            const recoveryValue = this.character.getAttributeValue(AttributeTypeEnum.BODY) / RECOVERY_MOD;
            this.character.increaseAttribute(AttributeTypeEnum.INTERNAL_DAMAGE, -recoveryValue);
        }
      }

}