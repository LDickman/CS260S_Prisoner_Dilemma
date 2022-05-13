export class OpponentAlwaysSplit {
    name = "Unconditional Cooperate (Always Split)";
    desc = "This opponent strategy cooperates with you unconditionally.";

    makeChoice() {
        return "Split";
    }
}