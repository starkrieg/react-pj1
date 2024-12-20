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
}