export class OpponentAlwaysSplit {
    name = "Unconditional Cooperate"
    desc = "This opponent strategy cooperates unconditionally."

    makeChoice() {
        return "Split"
    }
}