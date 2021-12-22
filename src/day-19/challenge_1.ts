import { readInput } from "../helpers/input";
import { Point2D } from "../helpers/Point2D";
import { Scanner2D } from "./Scanner2D";
import { parseScanners2D } from "./utils";

const inputFile = `${__dirname}/../../inputs/day-19.txt`;

const solve = () => {
    const input = readInput(inputFile);
    const scanners = parseScanners2D(input);
    
    const scannerA = scanners[0];
    const scannerB = scanners[1];
    
    scannerA.draw();
    scannerB.draw();

    const aligned = scannerA.tryToAlign(scannerB);
    if (aligned) {
        scannerA.join(aligned);
    }

    scannerA.draw();


    return "";
}

export default solve;
