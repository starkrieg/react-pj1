export class Utilities {

    static roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    static roundTo0Decimal(value: number) {
        return Math.round(value * 1) / 1;
    }

}