import { readInput } from "../helpers/input";
import { findLowPoints } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-09.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const heightMap = input.map((row) => row.split('').map((s) => parseInt(s, 10)));
    const lowPoints = findLowPoints(heightMap);
    
    return lowPoints.map((p) => p.depth + 1).reduce((prev, cur) => prev + cur, 0);
}

export default solve;
