export class RequirementVO {

    readonly name: string;
    readonly text: string;
    readonly isFulfilled: boolean;

    constructor(name: string, text: string, isFulfilled: boolean) {
        this.name = name;
        this.text = text;
        this.isFulfilled = isFulfilled;
    }

}