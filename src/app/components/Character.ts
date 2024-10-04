export class Character {
    year: number;
    month: number;
    maxAge: number;
    realm: string;
    money: number;
    qi: number;
    body: number;
    soul: number;

    constructor() {
        this.year = 16
        this.month = 1;
        this.realm = 'Mortal';
        this.maxAge = 16;
        this.money = 0;
        this.qi = 0;
        this.body = 1;
        this.soul = 0;
    }
}