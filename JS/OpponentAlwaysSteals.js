export class OpponentAlwaysSteal {
    name

    makeChoice() {
        return "Steal";
    }

    constructor(name) {
        this.name = name;
    }
}