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

    /**
     * Capitalizes first letter of all words in a text.
     * Useful for capitalizing IDs and such.
     * For composed words, use the separator so both parts are capitalized.
     * If no separator is passed, capitalization only applies to first letter of text.
     * @param text the text to be capitalized
     * @param separator the separator character, a space, a dash, etc
     */
    static toFirstLetterUpperAllWords(text: string, separator?: string) {
        if (separator) {
            return text.split(separator)
            .map(word => (word.charAt(0).toUpperCase() + word.slice(1)))
            .join(' ')
        } else {
            return text.charAt(0).toUpperCase() + text.slice(1);
        };
    }
}