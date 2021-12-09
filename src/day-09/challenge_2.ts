import { readInput } from "../helpers/input";
import { findBasinSize, findLowPoints } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-09.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const heightMap = input.map((row) => row.split('').map((s) => parseInt(s, 10)));
    const lowPoints = findLowPoints(heightMap);

    const basinSizes = []
    for (const lowPoint of lowPoints) {
        const basinSize = findBasinSize(heightMap, lowPoint);
        basinSizes.push(basinSize[0]);
    }

    basinSizes.sort((a, b) => a - b).reverse();
    return basinSizes.slice(0, 3).reduce((p, c) => p * c);
}

export default solve;
