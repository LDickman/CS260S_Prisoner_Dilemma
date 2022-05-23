export class OpponentAlwaysSplit {
    name = "Unconditional Cooperate";
    desc = "This opponent strategy cooperates with you unconditionally.";

    makeChoice() {
        return "Split";
    }
}