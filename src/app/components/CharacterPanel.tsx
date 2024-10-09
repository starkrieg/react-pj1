import { Character } from "./Character";

export default class CharacterPanel {

  private roundTo2Decimal(value: number) {
    return Math.round(value * 100) / 100;
  }

  createCharacterPanel(character: Character) {
      return (
        <div>
          <p>Age: {character.year}y, {character.month}m</p>
          <p>Life expectancy: {character.maxAge}y</p>
          <p>Realm: {character.realm}</p>
          <p>Qi: {this.roundTo2Decimal(character.qi)}</p>
          <p>Body: {this.roundTo2Decimal(character.body)}</p>
        </div>
      );
  }
}