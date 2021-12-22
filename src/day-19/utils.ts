import { Point2D } from "../helpers/Point2D";
import { Scanner2D } from "./Scanner2D";

export const parseScanners2D = (input: string[]): Scanner2D[] => {
    const scanners: Scanner2D[] = [];
    let scanner: Scanner2D | undefined = undefined;
    for (const row of input) {        
        if (row.startsWith("---")) {
            const name = row.replace("--- ", "").replace(" ---", "");
            scanner = new Scanner2D(name);
        } else if (row.length === 0 && scanner !== undefined) {
            scanners.push(scanner);
        } else {
            if (scanner !== undefined) {
                const [x,y] = row.split(",").map((s) => parseInt(s, 10));
                scanner.addBeacon(new Point2D(x, y));
            }
        }
    }
    return scanners;
}
