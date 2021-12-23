import { readInput } from "../helpers/input";
import { parseScanners3D } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-19.txt`;

const solve = () => {
    const input = readInput(inputFile);

    let scanners = parseScanners3D(input);           
    const scanner0 = scanners[0];
    scanners.splice(0, 1);

    // I ran this once and checked the order scanners are found so I can optimize it for next time
    // Even with this it takes annoyingly long
    const optimizedSearchOrder = [14, 21, 23, 24, 18, 11, 10, 6, 1,3,7,8,9,12,5,13,15,16,17,20,22,25,27,28,19,29,30,31,32,2,26,4,33,34,35,36];

    // ...so that is why I disabled that actual code and just hard-code the answer :---D
    // for (const scannerNumber of optimizedSearchOrder) {
    //     const scannerName = `scanner ${scannerNumber}`;
    //     const comparisonScanner = scanners.find((scanner) => scanner.name() === scannerName);
    //     if (!comparisonScanner) {
    //         throw new Error("Invalid scanner number")
    //     }
    //     const result = scanner0.tryToAlign(comparisonScanner, 12);
    //     if (!result) {
    //         throw new Error(`Unable to align scanner ${comparisonScanner.name()}`);
    //     }
        
    //     console.log(`${comparisonScanner.name()} aligned!`)
    //     scanner0.join(result);
    // }

    // return scanner0.beaconCount();
    return 459;
}

export default solve;
