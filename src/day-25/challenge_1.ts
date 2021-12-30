import { readInput } from "../helpers/input";
import { SeaFloor } from "./SeaFloor";

const inputFile = `${__dirname}/../../inputs/day-25.txt`;

const solve = () => {
    const input = readInput(inputFile).filter((s) => s.length > 0);
    const seaFloor = new SeaFloor(input);

    let cucumbersMoved = Infinity;
    let steps = 0;
    while (cucumbersMoved > 0) {
        cucumbersMoved = seaFloor.move();
        steps++;
    }

    return steps; // 300 is correct
}



export default solve;

