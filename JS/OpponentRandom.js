export class OpponentRandom {
    name

    makeChoice() {
        let actions = ["Split", "Steal"];
        let random = Math.floor(Math.random() * actions.length);
        return actions[random];
    }

    constructor(name) {
        this.name = name;
    }
}