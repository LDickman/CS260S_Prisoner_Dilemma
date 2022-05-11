export class OpponentRandom {
    name = "Random Choice";

    makeChoice() {
        let actions = ["Split", "Steal"];
        let random = Math.floor(Math.random() * actions.length);
        return actions[random];
    }
}