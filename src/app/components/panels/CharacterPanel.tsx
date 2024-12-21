'use client'

import { Character } from "@/app/data/character/Character";
import Button from "../Button";
import { CharacterController } from "@/app/data/character/CharacterController";
import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";
import { RealmEnum } from "@/app/data/realms/RealmEnum";
import { Utilities } from "@/app/data/utils/Utilities";
import { AttributeTypeEnum } from "@/app/data/character/AttributeTypeEnum";

export default function CharacterPanel() {

  const character = CharacterController.getCharacter()

  /**
   * Create an html label with the requirement data
   * @param title 
   * @param reqValue 
   * @param isReqFulfilled 
   * @returns 
   */
  function createLabelFromRequirement(requirementId: AttributeTypeEnum, reqValue: number, isReqFulfilled: boolean) {
    const title = requirementId.toString();
    const capitalizedReqId = title.charAt(0).toUpperCase() + title.slice(1);
    let stringReq = <p>{capitalizedReqId}: {reqValue}</p>
    if (isReqFulfilled) {
      stringReq = <s>{stringReq}</s>
    }
    return stringReq;
  }

  /**
   * Create list of requirements for next breakthrough
   * @param character 
   * @returns 
   */
  function createListRequirementsBreakthrough(character: Readonly<Character>) {
    if (!CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION) 
      || CharacterController.getCharacter().realm.id == RealmEnum.UNKNOWN) {
      return;
    }

    const preparedRequirements = CharacterController.getListRequirementBreakthrough(character).map(req => {
      return createLabelFromRequirement(req.reqName, req.reqValue, req.isReqFulfilled)
    })

    return (
      <div style={{marginTop: 10}}>
        Requirements:
        {preparedRequirements}
      </div>
    );
  }

  function createRealmBreakButton() {
    if (!CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION) 
      || CharacterController.getCharacter().realm.id == RealmEnum.UNKNOWN) {
      return;
    }
    return Button(
      'Breakthrough',
      CharacterController.breakthroughRealm.bind(CharacterController),
      '',
      {
        backgroundColor: 'var(--jade_green)',
        borderRadius: 5,
        padding: 4,
        marginTop: 10
      }
    );
  }

  function createQiLabel(character: Readonly<Character>) {
    const qiCapPercent = '('
    + Utilities.roundTo2Decimal(character.getQiCapPercent() * 100)
    + '%)';

    return (
      <p>Qi: {character.getQi()} {qiCapPercent}</p>
    );
  }
  
  const qiLabel = CharacterController.isHaveItem(ItemIdEnum.BOOK_QI_CULTIVATION) ?
    createQiLabel(character)
    : '';

  const bodyCapPercent = CharacterController.isHaveItem(ItemIdEnum.BOOK_BODY_REFINING) ? '('
  + Utilities.roundTo2Decimal(character.getBodyCapPercent() * 100)
  + '%)'
  : '';

  const deathCount = CharacterController.getDeathCount() > 0 ? 
    <p>Deaths: {CharacterController.getDeathCount()}</p>
    : ''

  return (
    <div className="row">
      <div className="col-6">
        <p>{character.realm!.title}</p>
        {qiLabel}
        <p>Body: {character.getBody()} {bodyCapPercent}</p>
        {deathCount}
      </div>
      <div className="col-6">
        <div>
          {character.realm!.desc}
        </div>
        {createListRequirementsBreakthrough(character)}
        {createRealmBreakButton()}
      </div>
    </div>
  );
}