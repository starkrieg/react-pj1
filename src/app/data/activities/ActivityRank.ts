export class ActivityRank {

    rank: number;
    exp: number;
    totalExpToNextRank: number;

    constructor(rank: number, exp: number, totalExpToNextRank: number) {
        this.rank = rank;
        this.exp = exp;
        this.totalExpToNextRank = totalExpToNextRank;
    }

    static createFromData(dataObject: Record<string, unknown>) {
        return new ActivityRank(
            (dataObject['rank'] as number),
            (dataObject['exp'] as number),
            (dataObject['totalExpToNextRank'] as number)
        );
    }
}