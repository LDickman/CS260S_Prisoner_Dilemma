import {currentRound, strategy1, strategy1Choices, strategy2, strategy2Choices} from "../StrategyVsStrategy.js"

export class StrategyGrim {
    name = "Grim"
    desc = "This opponent strategy cooperates until it's defected against once, and will then defect for the rest of the game."

    makeChoice() {
        if (currentRound === 1) {
            return "Split"
        } else if (strategy1 === this && strategy2Choices.includes('Steal')) {
            return "Steal"
        } else if (strategy2 === this && strategy1Choices.includes('Split')) {
            return "Steal"
        } else {
            return "Split"
        }
    }
}