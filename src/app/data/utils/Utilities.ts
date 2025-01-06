export class Utilities {

    static roundTo2Decimal(value: number) {
        return Math.round(value * 100) / 100;
    }

    static roundTo0Decimal(value: number) {
        return Math.round(value * 1) / 1;
    }

    static toScientificFormat(value: number) {
        if (value >= 1000000) {
            return this.roundTo2Decimal(value).toExponential(2).replace(/[+-]/g, '');
        } else {
            return this.roundTo2Decimal(value).toString();
        }
    }

}