export class OpponentAlwaysSteal {
    name = "Unconditional Defect (Always Steal)";
    desc = "This opponent strategy steals from you unconditionally.";
    makeChoice() {
        return "Steal";
    }
}