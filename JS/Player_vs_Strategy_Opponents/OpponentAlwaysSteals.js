export class OpponentAlwaysSteal {
    name = "Unconditional Defect"
    desc = "This opponent strategy defects unconditionally."

    makeChoice() {
        return "Steal"
    }
}