export class Calendar {
    year: number;
    day: number;

    constructor() {
        this.year = 600;
        this.day = 1;
        this.resetDefaultValues();
    }

    resetDefaultValues() {
        this.year = 600;
        this.day = 1;
    }
}