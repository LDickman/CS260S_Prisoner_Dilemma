import {currentRound, strategy1, strategy1Choices, strategy2, strategy2Choices} from "../StrategyVsStrategy.js"

export class StrategyTitForTatDefectFirst {
    name = "Tit for Tat Defect"
    desc = "This opponent strategy defects on the first round and imitates it's opponent's previous move thereafter."

    makeChoice() {
        if (currentRound === 1) {
            return 'Steal'
        } else {
            if (strategy1 === this) {
                let opponentStrategyChoice = strategy2Choices[currentRound - 2]
                if (opponentStrategyChoice === 'Split') {
                    return 'Split'
                } else {
                    return 'Steal'
                }
            }
            if (strategy2 === this) {
                let opponentStrategyChoice = strategy1Choices[currentRound - 2]
                if (opponentStrategyChoice === 'Split') {
                    return 'Split'
                } else {
                    return 'Steal'
                }
            }
        }
    }
}