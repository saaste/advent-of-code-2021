interface InsertionRule {
    pair: string;
    element: string;
}

interface PairCount {
    count: number;
    isLast: boolean;
}

export const getResult = (input: string[], steps: number): number => {
    let template: string = input.shift() || "";
    const insertionRules: InsertionRule[] = input.filter((str) => str.length > 0).map((str) => {
        const [pair, element] = str.split(" -> ");
        return { pair, element }
    });
    
    // Create insertions
    const insertions = new Map<string, string>();
    for (const rule of insertionRules) {
        insertions.set(rule.pair, rule.element);
    }

    // Initialize pair counter
    let pairCounter: Map<string, PairCount> = new Map();
    for (let cursor = 0; cursor < template.length - 1; cursor++) {
        const a = template[cursor];
        const b = template[cursor + 1]
        const existingCount = pairCounter.get(a + b)?.count || 0;
        const isLast = cursor === template.length - 2;
        pairCounter.set(a + b, { count: existingCount + 1, isLast })
    }
    
    // Go through steps
    let step = 0;
    
    while (step < steps) {
        const newPairCounter: Map<string, PairCount> = new Map();
        for (const [pair, pairCount] of pairCounter.entries()) {
            let a: string = pair[0];
            let b: string = pair[1];

            const insertion = insertions.get(pair);

            // Figure out the number of new pairs
            if (insertion && pairCount.count > 0) {
                const newPairA = a + insertion;
                const newPairACount = newPairCounter.get(newPairA)?.count || 0;
                const newPairB = insertion + b;
                const newPairBCount = newPairCounter.get(newPairB)?.count || 0;

                const aMarkedAsLast = newPairCounter.get(newPairA)?.isLast || false;
                const bMarkedAsLast = newPairCounter.get(newPairB)?.isLast || pairCount.isLast;

                newPairCounter.set(newPairA, { count: pairCount.count + newPairACount, isLast: aMarkedAsLast });
                newPairCounter.set(newPairB, { count: pairCount.count + newPairBCount, isLast: bMarkedAsLast });
            }
        }
        pairCounter = newPairCounter;
        step++;
    }

    // Calculate the number of each letter
    let lastLetter = "";
    const charCounter: Map<string, number> = new Map();
    for (const [pair, count] of pairCounter.entries()) {
        const a = pair[0];
        const b = pair[1];
        charCounter.set(a, (charCounter.get(a) || 0) + count.count);
        if (count.isLast) {
            lastLetter = pair[1];
        }
    }
    // Add +1 to the last letter because I'm an idiot and didn't figure out easy
    // to understand solution to this challenge :P
    charCounter.set(lastLetter, (charCounter.get(lastLetter) || 0) + 1)

    const mostCommon = Math.max(...charCounter.values());
    const leastCommon = Math.min(...charCounter.values());

    return mostCommon - leastCommon;
}