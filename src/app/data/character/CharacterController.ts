import { ActivityEnum } from "../activities/ActivityEnum";
import { AttributeEffect } from "../common/AttributeEffect";
import { AttributeEffectVO } from "../common/AttributeEffectVO";
import { ModifierTypeEnum } from "../common/ModifierTypeEnum";
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
    static isHavePermanentItem(itemId: ItemIdEnum) {
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
     * Check if character has the item on inventory
     * @param itemId 
     * @returns 
     */
    static isHaveInventoryItem(itemId: ItemIdEnum) {
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
            MessageController.pushMessageLoot(`Got [${item.name}]!`);
            switch(item.type) {
              case ItemTypeEnum.PERMANENT:
                this.character.permanentItemList.add(item.id);
                break;
              case ItemTypeEnum.CONSUMABLE:
                //TODO
                item.getEffectsWithUpgrade().forEach(effect => {
                  switch(effect.attribute) {
                    case AttributeTypeEnum.INTERNAL_DAMAGE:
                      this.character.increaseAttribute(effect.attribute, -effect.value)
                      MessageController.pushMessageLoot(`[${effect.attribute}] decreased by ${effect.value}`);
                      break;
                    default:
                      this.character.increaseAttribute(effect.attribute, effect.value)
                      MessageController.pushMessageLoot(`[${effect.attribute}] increased by ${effect.value}`);
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

    static breakthroughCultivationRealm(cultivationId: AttributeTypeEnum) {
        if (this.isCanBreakthroughEnergy && cultivationId == AttributeTypeEnum.QI) {
          this.isCanBreakthroughEnergy = false;
          const nextRealm = this.character.energyRealm.getNextRealm();
          nextRealm.applyRealmUpEffects(this.character);
          this.character.energyRealm = nextRealm;          
        } else if (this.isCanBreakthroughBody && cultivationId == AttributeTypeEnum.BODY) {
          this.isCanBreakthroughBody = false;
          const nextRealm = this.character.bodyRealm.getNextRealm();
          nextRealm.applyRealmUpEffects(this.character);
          this.character.bodyRealm = nextRealm;          
        }
    }

    static getRealmUpEffectsVO(cultivationId: AttributeTypeEnum) {
      let effects: AttributeEffect[] = [];
      let multiplierFoundationMod = 1;
      if (cultivationId == AttributeTypeEnum.QI) {
        effects = this.character.energyRealm.getNextRealm().realmUpEffects;
        multiplierFoundationMod = this.character.energyRealm.getNextRealm().getRealmUpMultiplierFoundation();
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

    static getRealmUpRequirementsVO(cultivationId: AttributeTypeEnum) {
      const prepList: any[] = [];

      if (cultivationId == AttributeTypeEnum.QI) {
        this.isCanBreakthroughEnergy = false;
    
        const nextRealm = this.character.energyRealm.getNextRealm();
    
        if (nextRealm.id == EnergyRealmEnum.UNKNOWN) {
          return [];
        }
    
        nextRealm.requirements.forEach(req => {
          let reqId = req.id;
          let reqValue = req.value;
          let isReqFulfilled = false;

          if (req.id == AttributeTypeEnum.QI_CAP_PERCENT) {
            reqId = AttributeTypeEnum.QI;
            reqValue = Utilities.roundTo2Decimal(this.character.getAttributeValue(AttributeTypeEnum.QI_TOTAL_CAPACITY) * (req.value/100))
            isReqFulfilled = (this.character.getQiCapPercent()*100 >= req.value);
          } else {
            isReqFulfilled = (this.character.getAttributeValue(req.id) >= req.value);
          }

          prepList.push({
              reqName: reqId,
              reqValue: reqValue,
              isReqFulfilled: isReqFulfilled
          });
        });

        this.isCanBreakthroughEnergy = prepList.every(req => req.isReqFulfilled);
      } else if (cultivationId == AttributeTypeEnum.BODY) {
        this.isCanBreakthroughBody = false;
    
        const nextRealm = this.character.bodyRealm.getNextRealm();
    
        if (nextRealm.id == BodyRealmEnum.UNKNOWN) {
          return [];
        }
    
        nextRealm.requirements.forEach(req => {
          let reqId = req.id;
          let reqValue = req.value;
          let isReqFulfilled = false;

          if (req.id == AttributeTypeEnum.BODY_CAP_PERCENT) {
            reqId = AttributeTypeEnum.BODY;
            reqValue = Utilities.roundTo2Decimal(this.character.getAttributeValue(AttributeTypeEnum.QI_TOTAL_CAPACITY) * (req.value/100))
            isReqFulfilled = (this.character.getBodyCapPercent()*100 >= req.value);
          } else {
            isReqFulfilled = (this.character.getAttributeValue(req.id) >= req.value);
          }

          prepList.push({
              reqName: reqId,
              reqValue: reqValue,
              isReqFulfilled: isReqFulfilled
          });
        });

        this.isCanBreakthroughBody = prepList.every(req => req.isReqFulfilled);
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