export class OpponentRandom {
    name = "Random Choice";
    desc = "Your opponent will randomly be supporting or be against you";
    
    makeChoice() {
        let actions = ["Split", "Steal"];
        let random = Math.floor(Math.random() * actions.length);
        return actions[random];
    }
}