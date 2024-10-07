export class Calendar {
    year: number;
    month: number;

    constructor() {
        this.year = 600;
        this.month = 1;
        this.resetDefaultValues();
    }

    resetDefaultValues() {
        this.year = 600;
        this.month = 1;
    }
}