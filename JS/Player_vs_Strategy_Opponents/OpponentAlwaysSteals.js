export class OpponentAlwaysSteal {
    name = "Unconditional Defect";
    desc = "This opponent strategy steals from you unconditionally.";

    makeChoice() {
        return "Steal";
    }
}