export class OpponentAlwaysSplit {
    name = "Unconditional Cooperate (Always Split)";
    desc = "Your opponent will always choose to cooperate with you";

    makeChoice() {
        return "Split";
    }
}