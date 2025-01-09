import { ActivityEnum } from "../activities/ActivityEnum";
import { ActivityRequirement } from "../common/ActivityRequirement";
import { AttributeEffect } from "../common/AttributeEffect";
import { AttributeEffectVO } from "../common/AttributeEffectVO";
import { AttributeRequirement } from "../common/AttributeRequirement";
import { IRequirement } from "../common/IRequirement";
import { ModifierTypeEnum } from "../common/ModifierTypeEnum";
import { RequirementVO } from "../common/RequirementVO";
import { ZoneIdEnum } from "../exploration/ZoneIdEnum";
import { Item } from "../items/Item";
import { ItemController } from "../items/ItemController";
import { ItemIdEnum } from "../items/ItemIdEnum";
import { ItemTypeEnum } from "../items/ItemTypeEnum";
import { MessageController } from "../messages/MessageController";
import { BodyRealmEnum } from "../realms/body/BodyRealmEnum";
import { BodyRealmVO } from "../realms/body/BodyRealmVO";
import { EnergyRealmEnum } from "../realms/energy/EnergyRealmEnum";
import { EnergyRealmVO } from "../realms/energy/EnergyRealmVO";
import { ErrorController } from "../utils/ErrorController";
import { Utilities } from "../utils/Utilities";
import { AttributeTypeEnum } from "./AttributeTypeEnum";
import { Character } from "./Character";

export class CharacterController {

    private static character: Character = new Character();

    private static isCanBreakthroughEnergy: boolean = false;

    private static isCanBreakthroughBody: boolean = false;

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
     * Checks if character has the permanent item
     * @param itemId item id
     * @returns 
     */
    private static isHavePermanentItem(itemId: ItemIdEnum) {
        return this.character.permanentItemList.has(itemId);
    }

    /**
     * Check if character has cleared specific zone
     * @param zoneId 
     * @returns 
     */
    static isHaveZoneCleared(zoneId: ZoneIdEnum) {
      return this.character.zoneClearedList.has(zoneId)
    }
    
    /**
     * Checks if character has the given item.
     * @param itemId 
     * @returns 
     */
    static isHaveItem(itemId: ItemIdEnum) {
      return this.isHavePermanentItem(itemId)
        || this.isHaveInventoryItem(itemId);
    }

    /**
     * Check if character has the item on inventory
     * @param itemId 
     * @returns 
     */
    private static isHaveInventoryItem(itemId: ItemIdEnum) {
      return this.character.inventoryList.find(it => it.id == itemId) ? true : false;
    }

    static giveItemById(itemId : ItemIdEnum) {
      this.giveItem(ItemController.getItemById(itemId));
    }

    /**
     * Gives the item to the character.
     * Character only holds the item id, not the whole item definition
     * @param itemId item id
     */
    static giveItem(item: Item | undefined) {
        if (item) {
            MessageController.pushMessageItem(`Got ${item.name}`, item.id);
            switch(item.type) {
              case ItemTypeEnum.PERMANENT:
                this.character.permanentItemList.add(item.id);
                break;
              case ItemTypeEnum.CONSUMABLE:
                item.getEffectsWithUpgrade().forEach(effect => {
                  switch(effect.attribute) {
                    case AttributeTypeEnum.INTERNAL_DAMAGE:
                      this.character.increaseAttribute(effect.attribute, -effect.value)
                      break;
                    default:
                      this.character.increaseAttribute(effect.attribute, effect.value)
                      break;
                  }
                });
                break;
              default:
                this.character.addItemInventory(item)
                break;
            }

        } else {
            ErrorController.throwSomethingWrongError();
        }
    }

    /**
     * Upgrades an item that should belong to the character.
     * Use this so the item effect is applied correctly after the upgrade.
     * @param item 
     */
    static giveItemUpgrade(item: Item | undefined) {
      if (item) {
        this.character.upgradeItemEffect(item);
      } else {
          ErrorController.throwSomethingWrongError();
      }
    }

    /**
     * Give a zone cleared proof to the character
     * @param zoneId id of zone that was cleared
     */
    static giveZoneCleared(zoneId: ZoneIdEnum) {
      this.character.zoneClearedList.add(zoneId);
    }
    
    /**
    * Reset values on game start or game hard reset
    */
    static resetToGameStart() {
      this.character.resetToGameStart()
    }

    static getItemList() {
        return this.character.inventoryList;
    }

    /**
     * Increments character age by 1
     * Returns true if reached max lifespan
     * @returns boolean if character reached max age
     */
    static ageCharacter1Year() : boolean {
        this.character.age1Year();
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

    private static removeZoneItems() {
      this.character.zoneClearedList.clear();
    }

    private static removeNonPermanentItems() {
        this.character.inventoryList = [];
    }

    static isCanRealmUp(cultivationId: AttributeTypeEnum) {
      if (cultivationId == AttributeTypeEnum.QI) {
        return this.isCanBreakthroughEnergy;
      } else if (cultivationId == AttributeTypeEnum.BODY) {
        return this.isCanBreakthroughBody;
      } else {
        return false;
      }
    }

    static breakthroughCultivationRealm(cultivationId: AttributeTypeEnum, realmId: EnergyRealmEnum | BodyRealmEnum) {
        if (this.isCanBreakthroughEnergy && cultivationId == AttributeTypeEnum.QI) {
          this.isCanBreakthroughEnergy = false;
          const nextRealm = this.character.energyRealm.getNextRealmList().find(realm => realm.id == (realmId as EnergyRealmEnum));
          if (nextRealm) {
            nextRealm.applyRealmUpEffects(this.character);
            this.character.energyRealm = nextRealm;
          } else {
            ErrorController.throwSomethingWrongError();
          }
        } else if (this.isCanBreakthroughBody && cultivationId == AttributeTypeEnum.BODY) {
          this.isCanBreakthroughBody = false;
          const nextRealm = this.character.bodyRealm.getNextRealm();
          nextRealm.applyRealmUpEffects(this.character);
          this.character.bodyRealm = nextRealm;          
        }
    }

    static getRealmUpEffectsVO(cultivationId: AttributeTypeEnum, realmId: EnergyRealmEnum | BodyRealmEnum) {
      let effects: AttributeEffect[] = [];
      let multiplierFoundationMod = 1;
      if (cultivationId == AttributeTypeEnum.QI) {
        const nextRealm = this.character.energyRealm.getNextRealmList().find(realm => realm.id == (realmId as EnergyRealmEnum));
        if (nextRealm) {
          effects = nextRealm.realmUpEffects;
          multiplierFoundationMod = nextRealm.getRealmUpMultiplierFoundation();  
        }
      } else if (cultivationId == AttributeTypeEnum.BODY) {
        effects = this.character.bodyRealm.getNextRealm().realmUpEffects;
        multiplierFoundationMod = this.character.bodyRealm.getNextRealm().getRealmUpMultiplierFoundation();
      }
      
      return effects.map(effect => {
        const effectValue = (effect.modifierType == ModifierTypeEnum.MULTI)
          ? (effect.value * multiplierFoundationMod)
          : effect.value;

        return new AttributeEffectVO(
          effect.attribute, 
          effect.modifierType, 
          effectValue)
      });
    }

    static getRealmUpRequirementsVO(cultivationId: AttributeTypeEnum, realmId: EnergyRealmEnum | BodyRealmEnum) : RequirementVO[] {
      const prepList: RequirementVO[] = [];

      function toVORequirement(character: Character, req: IRequirement) : RequirementVO {
        if (req instanceof AttributeRequirement) {
          const attrReq = req as AttributeRequirement;
          let reqId = attrReq.id;
          let reqValue = '';
          
          if (attrReq.id == AttributeTypeEnum.QI_CAP_PERCENT) {
            reqId = AttributeTypeEnum.QI;
            reqValue = Utilities.toScientificFormat(character.getAttributeValue(AttributeTypeEnum.QI_TOTAL_CAPACITY) * (attrReq.minValue/100))
          } else if (attrReq.id == AttributeTypeEnum.BODY_CAP_PERCENT) {
            reqId = AttributeTypeEnum.BODY;
            reqValue = Utilities.toScientificFormat(character.getAttributeValue(AttributeTypeEnum.BODY_CAPACITY) * (attrReq.minValue/100))
          } else {
            reqValue = String(attrReq.minValue)
          }
  
          const isReqFulfilled = attrReq.isRequirementMet();
  
          return new RequirementVO(reqId, reqValue, isReqFulfilled);
        } else if (req instanceof ActivityRequirement) {
          const actReq = req as ActivityRequirement;
          return new RequirementVO(actReq.id, String(actReq.rank), actReq.isRequirementMet());
        } else {
          return new RequirementVO('Unknown', 'Unknown', false);
        }
      }

      if (cultivationId == AttributeTypeEnum.QI) {
        this.isCanBreakthroughEnergy = false;
    
        const nextRealm = this.character.energyRealm.getNextRealmList().find(realm => realm.id == (realmId as EnergyRealmEnum));
    
        if (nextRealm) {
          if (nextRealm.id == EnergyRealmEnum.UNKNOWN) {
            return [];
          }

          nextRealm.realmUpRequirements.forEach(req => prepList.push(toVORequirement(this.character, req as AttributeRequirement)));
  
          this.isCanBreakthroughEnergy = prepList.every(req => req.isFulfilled) || this.isCanBreakthroughEnergy;
          
        } else {
          //no next realm with the given id
          ErrorController.throwSomethingWrongError();
        }    
        
      } else if (cultivationId == AttributeTypeEnum.BODY) {
        this.isCanBreakthroughBody = false;
    
        const nextRealm = this.character.bodyRealm.getNextRealm();
    
        if (nextRealm.id == BodyRealmEnum.UNKNOWN) {
          return [];
        }
    
        nextRealm.realmUpRequirements.forEach(req => prepList.push(toVORequirement(this.character, req as AttributeRequirement)));

        this.isCanBreakthroughBody = prepList.every(req => req.isFulfilled);
      } else {
        ErrorController.throwSomethingWrongError();
      }
    
      return prepList;
    }

    static getDeathCount() {
      return this.deathCount;
    }

    static increaseDeathCount() {
      this.deathCount++;
    }

    static getFightingPower() {
      return this.character.getFightingPower()!;
    }

    static getHealth() {
      return this.character.getHealth()!;
    }

    static incrementFightCount() {
      this.fightTotalCount++;
    }

    static getFightCount() : Readonly<number> {
      return this.fightTotalCount;
    }

    static getFightingStatus() {
      return this.character.getLevelStatus();
    }

    static getFightingLevel() {
      return this.character.getLevel();
    }

    static incrementFightExperience(value: number) {
      this.character.addFightingExperience(value);
    }

    static recoverInternalInjury() {
      const internalDamage = this.character.getAttributeValue(AttributeTypeEnum.INTERNAL_DAMAGE)
      if (internalDamage > 0) {
          const RECOVERY_MOD = 15;
          const recoveryValue = this.character.getAttributeValue(AttributeTypeEnum.BODY) / RECOVERY_MOD;
          this.character.increaseAttribute(AttributeTypeEnum.INTERNAL_DAMAGE, -recoveryValue);
      }
    }

    static updateAttributesFromActivity(id: ActivityEnum) {
      this.character.updateAttributesFromActivity(id);
    }

    static getRealmVO(realmId: EnergyRealmEnum | BodyRealmEnum) {
      if (Object.values(EnergyRealmEnum).includes(realmId as EnergyRealmEnum)) {
        return new EnergyRealmVO(realmId as EnergyRealmEnum)
      } else {
        return new BodyRealmVO(realmId as BodyRealmEnum)
      }
    }

}