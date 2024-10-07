import { Character } from "./Character";

export default class CharacterPanel {

    createCharacterPanel(character: Character) {
        return (
          <div>
            <p>Age: {character.year}y, {character.month}m</p>
            <p>Life expectancy: {character.maxAge}y</p>
            <p>Realm: {character.realm}</p>
            <p>Qi: {character.qi}</p>
            <p>Body: {character.body}</p>
            <p>Soul: {character.soul}</p>
          </div>
        );
    }
}