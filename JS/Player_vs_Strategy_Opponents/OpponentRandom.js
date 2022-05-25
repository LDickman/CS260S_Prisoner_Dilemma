export class OpponentRandom {
    name = "Random Choice";
    desc = "This opponent strategy will randomly cooperate or defect."
    
    makeChoice() {
        let actions = ["Split", "Steal"]
        let random = Math.floor(Math.random() * actions.length)
        return actions[random]
    }
}