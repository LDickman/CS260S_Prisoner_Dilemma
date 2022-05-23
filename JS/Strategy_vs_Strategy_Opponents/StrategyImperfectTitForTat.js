import {currentRound, strategy1, strategy1Choices, strategy2, strategy2Choices} from "../StrategyVsStrategy.js"

export class StrategyImperfectTitForTat {
    name = "Imperfect Tit for Tat"
    desc = "This opponent strategy imitates it's opponent's last move with high (but less than one) probability."

    makeChoice() {
        let p = Math.floor((Math.random() * (4 - 1 + 1) + 1))
        let opponentStrategyChoice
        if (currentRound === 1) {
            return "Split"
        } else if (strategy1 === this) {
            opponentStrategyChoice = strategy2Choices[currentRound - 2]
            if (p === 1 || p === 2 || p === 3) {
                if (opponentStrategyChoice === "Split") {
                    return "Split"
                } else {
                    return "Steal"
                }
            } else {
                if (opponentStrategyChoice === "Split") {
                    return "Steal"
                } else {
                    return "Split"
                }
            }
        } else if (strategy2 === this) {
            opponentStrategyChoice = strategy1Choices[currentRound - 2]
            if (opponentStrategyChoice === 1 || p === 2 || p === 3) {
                if (opponentStrategyChoice === "Split") {
                    return "Split"
                } else {
                    return "Steal"
                }
            } else {
                if (opponentStrategyChoice === "Split") {
                    return "Steal"
                } else {
                    return "Split"
                }
            }
        }
    }
}