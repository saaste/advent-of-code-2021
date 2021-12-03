export interface Bit {
    zeros: number;
    ones: number;
}

export const initializeBitCounter = (report: string[]): Bit[] =>
    report[0].split("").map((_) => ({
        zeros: 0,
        ones: 0
    }));

export const countBits = (report: string[]): Bit[] => {
    const bits = initializeBitCounter(report);
    report.forEach((number) => {
        number.split("").forEach((char, index) => {
            if (char === "0") {
                bits[index].zeros++;
            } else {
                bits[index].ones++;
            }
        })
    });
    return bits;
}

export const findReportValue = (report: string[], comp: (bit: Bit) => string): number => {
    let bits = countBits(report);
    let index = 0;
    while (report.length > 1) {
        report = report.filter((value) => {
            const bit = bits[index];
            return value[index] === comp(bit);
        });
        bits = countBits(report);
        index++;
    }
    return parseInt(report[0], 2);
}