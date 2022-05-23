import {currentRound, strategy1, strategy1Choices, strategy2Choices} from "../StrategyVsStrategy.js"

export class StrategyTitForTwoTats {
    name = "Tit for Two Tats"
    desc = "This opponent strategy cooperates with it's opponent unless defected against twice in a row."

    makeChoice() {
        if (this === strategy1) {
            if (strategy2Choices[currentRound - 2] === "Steal" && strategy2Choices[currentRound - 3] === "Steal") {
                return "Steal"
            } else {
                return "Split"
            }
        } else {
            if (strategy1Choices[currentRound - 2] === "Steal" && strategy1Choices[currentRound - 3] === "Steal") {
                return "Steal"
            } else {
                return "Split"
            }
        }
    }
}