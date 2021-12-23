import { Point2D } from "../helpers/Point2D";
import { Point3D } from "../helpers/Point3D";
import { Scanner2D } from "./Scanner2D";
import { Scanner3D } from "./Scanner3D";

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
export const parseScanners3D = (input: string[]): Scanner3D[] => {
    const scanners: Scanner3D[] = [];
    let scanner: Scanner3D | undefined = undefined;
    for (const row of input) {        
        if (row.startsWith("---")) {
            const name = row.replace("--- ", "").replace(" ---", "");
            scanner = new Scanner3D(name);
        } else if (row.length === 0 && scanner !== undefined) {
            scanners.push(scanner);
        } else {
            if (scanner !== undefined) {
                const [x,y,z] = row.split(",").map((s) => parseInt(s, 10));
                scanner.addBeacon(new Point3D(x, y, z));
            }
        }
    }
    return scanners;
}

export const manhattanDistance = (pointA: Point3D, pointB: Point3D): number => {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y) + Math.abs(pointA.z - pointB.z);
}
