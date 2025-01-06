'use client'

import { Character } from "@/app/data/character/Character";
import Button from "../Button";
import { CharacterController } from "@/app/data/character/CharacterController";
import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { EnergyRealmEnum } from "@/app/data/realms/energy/EnergyRealmEnum";
import { AttributeTypeEnum } from "@/app/data/character/AttributeTypeEnum";
import { IBaseRealmVO } from "@/app/data/realms/common/IBaseRealmVO";
import { BodyRealmEnum } from "@/app/data/realms/body/BodyRealmEnum";
import { Utilities } from "@/app/data/utils/Utilities";

export default function CultivationPanel() {

  const character = CharacterController.getCharacter()

  const isBodyCultivationUnlocked = CharacterController.isHaveItem(ItemIdEnum.BOOK_BODY_CULTIVATION);

  return (
    <div className="cultivation-realm-panel">
        <div className="cultivation-realm-grid">
          {EnergyCultivationDisplay(character)}
          {isBodyCultivationUnlocked && BodyCultivationDisplay(character)}
        </div>
    </div>
  );

}

function EnergyCultivationDisplay(character: Readonly<Character>) {
  const energyRealmVO = CharacterController.getRealmVO(character.energyRealm.id);
  
  const nextRealmList = character.energyRealm.getNextRealmIdList();

  const energyRealmList = nextRealmList.filter(realmId => realmId != EnergyRealmEnum.UNKNOWN)
    .map(realmId => CharacterController.getRealmVO(realmId))
    .filter(realmVo => realmVo.isUnlocked)
    .map(realmVo => createNextRealmInformation(realmVo) );

  return (
    <div className="cultivation-realm">
      <div className="cultivation-realm-title">{energyRealmVO.title}</div>
      <div className="cultivation-realm-desc">{energyRealmVO.desc}</div>
      <div className="cultivation-realm-grid">
        { energyRealmList }
      </div>
    </div>
  );
}

function BodyCultivationDisplay(character: Readonly<Character>) {
  const bodyRealmVO = CharacterController.getRealmVO(character.bodyRealm.id);
  const nextRealmVO = CharacterController.getRealmVO(character.bodyRealm.getNextRealm().id)
  const isNextRealmValid = character.bodyRealm.getNextRealm().id != BodyRealmEnum.UNKNOWN;

  return (
    <div className="cultivation-realm">
        <div className="cultivation-realm-title">{bodyRealmVO.title}</div>
        <div className="cultivation-realm-title">{bodyRealmVO.desc}</div>
        { isNextRealmValid && createNextRealmInformation(nextRealmVO) }
    </div>
  );
}

function createNextRealmInformation(realmVO: IBaseRealmVO) {
  let realmUpFoundation = '';
  if (realmVO.type == AttributeTypeEnum.QI) {
    const isShowRealmFoundation = CharacterController.isHaveItem(ItemIdEnum.BOOK_PERFECT_QI_CONDENSATION);
    realmUpFoundation = isShowRealmFoundation 
      ? `(${Utilities.roundTo2Decimal(CharacterController.getCharacter().getQiCapPercent()*100)}%)`
      : ''
  }
  return (
    <div className="cultivation-realm">
        <div className="cultivation-next-realm-title">{realmVO.title} {realmUpFoundation}</div>
        { createRealmUpEffects(realmVO.type, realmVO.id) }
        { createRealmUpRequirements(realmVO.type, realmVO.id) }
        { createRealmUpButton(realmVO.type, realmVO.id) }
    </div>
  );
}

/**
 * Create an html label with the requirement data
 * @param title 
 * @param reqValue 
 * @param isReqFulfilled 
 * @returns 
 */
function createLabelFromRequirement(requirementId: string, reqValue: string, isReqFulfilled: boolean) {
  const title = requirementId.toString();

  const capitalizedReqId = title.split('-')
    .map(word => (word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');

  let stringReq = <p>{capitalizedReqId}: {reqValue}</p>
  if (isReqFulfilled) {
    stringReq = <s>{stringReq}</s>
  }
  return stringReq;
}


/**
 * Create list of effects of the realm up
 * @param character 
 * @returns 
 */
function createRealmUpEffects(cultivationId: AttributeTypeEnum, realmId: EnergyRealmEnum | BodyRealmEnum) {

  const effectsVO = CharacterController.getRealmUpEffectsVO(cultivationId, realmId)
    .map((effect, idx) => {
      return (<p key={idx} >{effect.text}</p>);
  });

  const hasEffects = effectsVO.length > 0;

  return (
    <div className="cultivation-realm-up-effects">
      { hasEffects && effectsVO}
    </div>
  );
}

/**
 * Create list of requirements for next breakthrough
 * @param character 
 * @returns 
 */
function createRealmUpRequirements(cultivationId: AttributeTypeEnum, realmId: EnergyRealmEnum | BodyRealmEnum) {
  const preparedRequirements = CharacterController.getRealmUpRequirementsVO(cultivationId, realmId)
    .map(req => {
    return createLabelFromRequirement(req.name, req.text, req.isFulfilled)
  });

  const hasRequirements = preparedRequirements.length > 0;

  return (
    <div className="cultivation-realm-up-requirements">
      { hasRequirements && (<div>Requirements</div>) } 
      { hasRequirements && preparedRequirements}
    </div>
  );
}

function createRealmUpButton(cultivationId: AttributeTypeEnum, realmId: EnergyRealmEnum | BodyRealmEnum) {
  if (CharacterController.getCharacter().energyRealm.id == EnergyRealmEnum.UNKNOWN) {
    return;
  }

  const isCannotRealmUp = !CharacterController.isCanRealmUp(cultivationId) 
  const disabledStyle = isCannotRealmUp ? ' cultivation-button-disabled' : ''

  return Button(
    'Breakthrough',
    CharacterController.breakthroughCultivationRealm.bind(CharacterController, cultivationId, realmId),
    ('cultivation-realm-up-button' + disabledStyle),
    { /* no custom style */ },
    isCannotRealmUp
  );
} 