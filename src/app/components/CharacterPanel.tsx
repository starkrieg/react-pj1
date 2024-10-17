'use client'

import { Character } from "./Character";

export default class CharacterPanel {

  isBreakthroughReady: boolean = false;
  nextRealmId = '';

  private getNextRealmPreparedReqList(char: Character) {
    this.isBreakthroughReady = false;

    if (this.nextRealmId == 'unknown') {
      return [];
    }

    const nextRealm = char.realm.getNextRealm();

    if (!nextRealm || nextRealm.id == 'unknown') {
      this.nextRealmId = 'unknown'
      return [];
    }

    const prepList = [];

    const qiReqFilled = (char.getQi() >= nextRealm.requirements.qi);
    prepList.push(this.getStringReq('qi', 
      nextRealm.requirements.qi,
      qiReqFilled
    ));

    const bodyReqFilled = (char.getBody() >= nextRealm.requirements.body);

    if (nextRealm.requirements.body > 0) {
      prepList.push(this.getStringReq('body', 
        nextRealm.requirements.body, 
        bodyReqFilled
      ));
    }

    this.isBreakthroughReady = qiReqFilled && bodyReqFilled;

    return prepList;
  }

  getStringReq(title: string, reqValue: number, isFilled: boolean) {
    const capitalizedReqId = title.charAt(0).toUpperCase() + title.slice(1);
    let stringReq = <p>{capitalizedReqId}: {reqValue}</p>
    if (isFilled) {
      stringReq = <s>{stringReq}</s>
    }
    return stringReq;
  }

  breakthroughRealm(character: Character) {
    if (this.isBreakthroughReady) {
      character.realm.doRealmUp(character);
      this.isBreakthroughReady = false;
    }
  }

  private roundTo2Decimal(value: number) {
    return Math.round(value * 100) / 100;
  }

  createRealmReq(character: Character) {
    if (this.nextRealmId == 'unknown') {
      return;
    }
    return (
      <div>
        Requirements:
        {this.getNextRealmPreparedReqList(character)}
      </div>
    );
  }

  createRealmBreakButton(character: Character) {
    if (this.nextRealmId == 'unknown') {
      return;
    }
    return (
      <button style={{
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 4,
        fontWeight: 'bold'
      }}
      onClick={this.breakthroughRealm.bind(this, character)}
      >Breakthrough</button>
    );
  }

  createCharacterPanel(character: Character) {
      const qiCapPercent = '('
      + this.roundTo2Decimal(character.getQiCapPercent() * 100)
      + '%)';

      const bodyCapPercent = character.isShowFoundation ? '('
      + this.roundTo2Decimal(character.getBodyCapPercent() * 100)
      + '%)'
      : '';

      return (
        <div className="row">
          <div className="col-6">
            <p>Age: {character.year}y</p>
            <p>Life expectancy: {character.maxAge}y</p>
            <p>{character.realm.title}</p>
            <p>Qi: {this.roundTo2Decimal(character.getQi())} {qiCapPercent}</p>
            <p>Body: {this.roundTo2Decimal(character.getBody())} {bodyCapPercent}</p>
          </div>
          <div className="col-6">
            <div>
              {character.realm.desc}
            </div>
            {this.createRealmReq(character)}
            {this.createRealmBreakButton(character)}
          </div>
        </div>
      );
  }
}