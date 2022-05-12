export class OpponentAlwaysSteal {
    name = "Unconditional Defect (Always Steal)";
    desc = "Your opponent will always choose to defect with you";
    makeChoice() {
        return "Steal";
    }
}