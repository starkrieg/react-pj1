import { Character } from "./Character";

export class CharacterController {

    static character: Character = new Character();

    private static isBreakthroughReady: boolean = false;
    static nextRealmId = '';
  
    static breakthroughRealm(character: Character) {
        if (this.isBreakthroughReady) {
            character.realm!.doRealmUp(character);
            this.isBreakthroughReady = false;
        }
    }

    static getListRequirementBreakthrough(char: Character) {
        this.isBreakthroughReady = false;
        
        if (this.nextRealmId == 'unknown') {
          return [];
        }
    
        const nextRealm = char.realm!.getNextRealm();
    
        if (!nextRealm || nextRealm.id == 'unknown') {
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

}