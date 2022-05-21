export class OpponentRandom {
    name = "Random Choice";
    desc = "This opponent strategy will randomly split or steal with/from you.";
    
    makeChoice() {
        let actions = ["Split", "Steal"];
        let random = Math.floor(Math.random() * actions.length);
        return actions[random];
    }
}