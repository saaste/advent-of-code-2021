import { readInputAsString } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-07.txt`;

const calculateFuelCost = (input: number[], targetPosition: number, bestFuelConsumption: number): number => {
    let fuelUsed = 0;
    for (const position of input) {
        const max = Math.max(position, targetPosition);
        const min = Math.min(position, targetPosition);
        let fuelCost = 1;
        for (let currentPosition = min; currentPosition < max; currentPosition++) {
            fuelUsed += fuelCost;
            fuelCost++;
            if (fuelUsed >= bestFuelConsumption) {
                return Infinity;
            }
        }
    }
    return fuelUsed;
}

const solve = () => {
    const input = readInputAsString(inputFile).split(",").map((n) => parseInt(n, 10));
    const minPosition = Math.min(...input);
    const maxPosition = Math.max(...input);

    let bestPosition = 0;
    let bestFuelConsumption = Infinity;
    for (let currentPosition = minPosition; currentPosition <= maxPosition; currentPosition++) {
        const fuelConsumption = calculateFuelCost(input, currentPosition, bestFuelConsumption);
        if (fuelConsumption < bestFuelConsumption) {
            bestPosition = currentPosition;
            bestFuelConsumption = fuelConsumption;
        }
    }
    return bestFuelConsumption;
}

export default solve;
