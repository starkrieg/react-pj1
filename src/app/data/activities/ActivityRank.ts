export class ActivityRank {

    rank: number;
    exp: number;
    totalExpToNextRank: number;

    constructor(rank: number, exp: number, totalExpToNextRank: number) {
        this.rank = rank;
        this.exp = exp;
        this.totalExpToNextRank = totalExpToNextRank;
    }

}