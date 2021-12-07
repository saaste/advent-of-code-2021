import { readInputAsString } from "../helpers/input";
import { average, calculateFuelCost } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-07.txt`;

const solve = () => {
    const input = readInputAsString(inputFile).split(",").map((n) => parseInt(n, 10));
    const averagePosition = average(input);
    const floorFuelConsumption = calculateFuelCost(input, Math.floor(averagePosition), Infinity);
    const ceilingFuelConsumption = calculateFuelCost(input, Math.ceil(averagePosition), Infinity);

    return Math.min(floorFuelConsumption, ceilingFuelConsumption);
}

export default solve;
