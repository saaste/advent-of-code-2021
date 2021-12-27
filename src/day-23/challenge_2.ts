import { assert } from "console";
import { readInput } from "../helpers/input";
import { solvePath } from "./dijkstra";
import { createGameStateName } from "./solver";
import { PodState, PodType } from "./types";

const inputFile = `${__dirname}/../../inputs/day-23.txt`;

const solve = () => {
    const input = readInput(inputFile);

    input[5] = input[3]
    input[6] = input[4]
    input[3] = "  #D#C#B#A#  "
    input[4] = "  #D#B#A#C#  "

    const podStates: PodState[] = [];
    let id = 1;
    for (let y = 0; y < input.length; y++) {
        if (y >= 1) { // Ignore first two rows
            for (let x = 0; x < input[y].length; x++) {
                const char: string = input[y][x];
                if (char === "A" || char === "B" || char === "C" || char === "D") {
                    if (y === 1)
                        podStates.push({ podType: PodType[char], room: -1, depth: -1, loc: x - 1, id, podName: char })
                    else
                        podStates.push({ podType: PodType[char], room: x - 1, depth: y - 1, loc: -1, id, podName: char })
                    id++;
                }
            }
        }
    }

    const initialGameState = {
        podStates: podStates,
        cost: 0,
        name: createGameStateName(podStates)
    };

    const result = solvePath(initialGameState, 2);
    assert(result === 49803, "Step 2 is incorrect");
    return result  // 49803 IS CORRECT
}
export default solve;

