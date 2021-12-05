import { readInput } from "../helpers/input";
import { Board } from "./Board";

const inputFile = `${__dirname}/input.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const bingoNumbers = input[0].split(",").map((c) => parseInt(c, 10));
    const boards = Board.createBoardsFromInput(input);

    let unmarkedSum = 0;
    let finalNumber = 0;
    for (const bingoNumber of bingoNumbers) {
        for (const board of boards) {
            board.markSelected(bingoNumber);
            if (board.hasBingo()) {
                unmarkedSum = board.unmarkedSum();
                finalNumber = bingoNumber;
                break;
            }
        }
        if (unmarkedSum > 0) {
            break;
        }
    }

    return unmarkedSum * finalNumber;
}

export default solve;
