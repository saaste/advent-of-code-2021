export const median = (numbers: number[]): number => {
    numbers.sort((a, b) => a - b);
    const half = Math.floor(numbers.length / 2);
    if (numbers.length % 2) return numbers[half];

    return (numbers[half - 1] + numbers[half]) / 2.0;
}

export const average = (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length
}

export const calculateFuelCost = (input: number[], targetPosition: number, bestFuelConsumption: number): number => {
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