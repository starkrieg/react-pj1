export class Calendar {
    private static year: number = 600;
    private static day: number = 1;

    static resetDefaultValues() {
        this.year = 600;
        this.day = 1;
    }

    /**
     * Increment day in 1 and returns boolean if year changed
     * @returns boolean if year changed
     */
    static incrementDay() {
        this.day += 1;
        if (this.day > 365) {
            this.day -= 365;
            this.year += 1;
            return true;
        } else {
            return false;
        }
    }

    static getYear() {
        return this.year;
    }

    static getDay() {
        return this.day;
    }

    static exportSaveData() : Record<string, unknown> {
        return {
            year: this.year,
            day: this.day
        }
    }

    static importSaveData(dataObject: Partial<Record<string, unknown>>) {
        //empty object is not processed
        if (!dataObject) {
            return;
        }

        this.year = dataObject['year'] as number;
        this.day = dataObject['day'] as number;
    }
}