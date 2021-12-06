export const initialize = (fishes: number[]): Map<number, number> => {
    const daysToOffspring: Map<number, number> = new Map();
    for (const daysLeft of fishes) {
        const existingValue = daysToOffspring.get(daysLeft) || 0;
        daysToOffspring.set(daysLeft, existingValue + 1)
    }
    return daysToOffspring;
}

export const simulateDays = (state: Map<number, number>, days: number) => {
    for (let day = 0; day < days; day++) {
        let fishToGiveBirth = 0;
        for (let i = 0; i <= 8; i++) {
            if (i === 0) {
                fishToGiveBirth = state.get(i) || 0;
            } else {
                const currentFishes = state.get(i) || 0;
                state.set(i - 1, currentFishes);
            }
        }

        const sixDaysFishes = state.get(6) || 0;
        state.set(6, sixDaysFishes + fishToGiveBirth);
        state.set(8, fishToGiveBirth);
    }
    return state;
}
