export class OpponentAlwaysSplit {
    name

    makeChoice() {
        return "Split";
    }

    constructor(name) {
        this.name = name;
    }
}