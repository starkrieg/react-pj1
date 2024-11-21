'use client'

import { Character } from "@/app/data/character/Character";
import Button from "../Button";
import { CharacterController } from "@/app/data/character/CharacterController";
import { ItemIdEnum } from "@/app/data/items/ItemIdEnum";

export default function CharacterPanel(characterController: CharacterController, character: Character) {

  function getReqAsLabel(title: string, reqValue: number, isReqFulfilled: boolean) {
    const capitalizedReqId = title.charAt(0).toUpperCase() + title.slice(1);
    let stringReq = <p>{capitalizedReqId}: {reqValue}</p>
    if (isReqFulfilled) {
      stringReq = <s>{stringReq}</s>
    }
    return stringReq;
  }

  function roundTo2Decimal(value: number) {
    return Math.round(value * 100) / 100;
  }

  function createRealmReq(character: Character) {
    if (!character.isHaveItem(ItemIdEnum.QI_CULTIVATION_KNOWLEDGE) || characterController.nextRealmId == 'unknown') {
      return;
    }

    const preparedRequirements = characterController.getNextRealmReqList(character).map(req => {
      return getReqAsLabel(req.reqName, req.reqValue, req.isReqFulfilled)
    })

    return (
      <div style={{marginTop: 10}}>
        Requirements:
        {preparedRequirements}
      </div>
    );
  }

  function createRealmBreakButton(character: Character) {
    if (!character.isHaveItem(ItemIdEnum.QI_CULTIVATION_KNOWLEDGE) || characterController.nextRealmId == 'unknown') {
      return;
    }
    return Button(
      'Breakthrough',
      '',
      {
        backgroundColor: 'var(--jade_green)',
        borderRadius: 5,
        padding: 4,
        marginTop: 10
      },
      characterController.breakthroughRealm.bind(characterController, character)
    );
  }

  function createQiLabel(character: Character) {
    const qiCapPercent = '('
    + roundTo2Decimal(character.getQiCapPercent() * 100)
    + '%)';

    return (
      <p>Qi: {roundTo2Decimal(character.getQi())} {qiCapPercent}</p>
    );
  }
  
  const qiLabel = character.isHaveItem(ItemIdEnum.QI_CULTIVATION_KNOWLEDGE) ?
    createQiLabel(character)
    : '';

  const bodyCapPercent = character.isHaveItem(ItemIdEnum.CULTIVATION_FOUNDATION_KNOWLEDGE) ? '('
  + roundTo2Decimal(character.getBodyCapPercent() * 100)
  + '%)'
  : '';

  const deathCount = character.deaths > 0 ? 
    <p>Deaths: {character.deaths}</p>
    : ''

  return (
    <div className="row">
      <div className="col-6">
        <p>{character.realm!.title}</p>
        {qiLabel}
        <p>Body: {roundTo2Decimal(character.getBody())} {bodyCapPercent}</p>
        {deathCount}
      </div>
      <div className="col-6">
        <div>
          {character.realm!.desc}
        </div>
        {createRealmReq(character)}
        {createRealmBreakButton(character)}
      </div>
    </div>
  );
}