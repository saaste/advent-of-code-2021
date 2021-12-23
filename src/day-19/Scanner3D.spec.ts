import { Point3D } from "../helpers/Point3D";
import { Scanner3D } from "./Scanner3D";
import { expect } from "chai";
import { readInput } from "../helpers/input";
import { parseScanners3D } from "./utils";

describe("Scanner3D", () => {
    describe("Auto-align", () => {
        it("Matches two identical scanners", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[1,1,1], [2,2,2], [3,3,3]]);
            const scannerB = createScannerWithPoints("Scanner B", [[1,1,1], [2,2,2], [3,3,3]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Matches two scanners that needs moving", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[1,1,1], [2,2,2], [3,3,3]]);
            const scannerB = createScannerWithPoints("Scanner B", [[1,2,1], [2,3,2], [3,4,3]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Matches two scanners that needs rotating around Z axis", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[0,1,1], [1,2,2], [2,2,3]]);
            const scannerB = createScannerWithPoints("Scanner B", [[0,3,1], [1,2,2], [1,1,3]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Matches two scanners that needs rotating around X axis", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[0,1,0], [1,1,0], [2,1,0]]);
            const scannerB = createScannerWithPoints("Scanner B", [[0,0,1], [1,0,1], [2,0,1]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Matches two scanners that needs rotating around Y axis", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[0,2,0], [1,1,1], [2,0,2]]);
            const scannerB = createScannerWithPoints("Scanner B", [[2,2,2], [1,1,1], [0,0,0]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Matches two scanners that needs flipping around Z axis", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[1,2,0], [1,2,1], [1,2,2]]);
            const scannerB = createScannerWithPoints("Scanner B", [[1,2,0], [1,2,-1], [1,2,-2]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Matches two scanners that needs flipping around X axis", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[0,2,0], [1,2,1], [2,2,2]]);
            const scannerB = createScannerWithPoints("Scanner B", [[0,2,0], [-1,2,1], [-2,2,2]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Matches two scanners that needs flipping around Y axis", () => {
            const scannerA = createScannerWithPoints("Scanner A", [[1,0,1], [1,1,1], [1,2,1]]);
            const scannerB = createScannerWithPoints("Scanner B", [[1,0,1], [1,-1,1], [1,-2,1]]);
            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
        });

        it("Handle provided example data", () => {
            const inputFile = `${__dirname}/test-data/1.txt`;
            const input = readInput(inputFile);
            const scanners = parseScanners3D(input);
            
            const scanner0 = scanners[0];

            let result = scanner0.tryToAlign(scanners[1], 12);
            if (result !== null) {
                scanner0.join(result);
            }

            expect(scanner0?.scannerPositions().length).to.equal(2);
            expect(scanner0?.scannerPositions()[0]).to.deep.equal(new Point3D(0, 0, 0))
            expect(scanner0?.scannerPositions()[1]).to.deep.equal(new Point3D(68, -1246, -43))

            result = scanner0.tryToAlign(scanners[4], 12);
            if (result !== null) {
                scanner0.join(result);
            }

            expect(scanner0?.scannerPositions().length).to.equal(3);
            expect(scanner0?.scannerPositions()[0]).to.deep.equal(new Point3D(0, 0, 0))
            expect(scanner0?.scannerPositions()[1]).to.deep.equal(new Point3D(68, -1246, -43))
            expect(scanner0?.scannerPositions()[2]).to.deep.equal(new Point3D(-20,-1133,1061))

            result = scanner0.tryToAlign(scanners[2], 12);
            if (result !== null) {
                scanner0.join(result);
            }
            expect(scanner0?.scannerPositions().length).to.equal(4);
            expect(scanner0?.scannerPositions()[0]).to.deep.equal(new Point3D(0, 0, 0))
            expect(scanner0?.scannerPositions()[1]).to.deep.equal(new Point3D(68, -1246, -43))
            expect(scanner0?.scannerPositions()[2]).to.deep.equal(new Point3D(-20,-1133,1061))
            expect(scanner0?.scannerPositions()[3]).to.deep.equal(new Point3D(1105,-1205,1229))

            result = scanner0.tryToAlign(scanners[3], 12);
            if (result !== null) {
                scanner0.join(result);
            }
            expect(scanner0?.scannerPositions().length).to.equal(5);
            expect(scanner0?.scannerPositions()[0]).to.deep.equal(new Point3D(0, 0, 0))
            expect(scanner0?.scannerPositions()[1]).to.deep.equal(new Point3D(68, -1246, -43))
            expect(scanner0?.scannerPositions()[2]).to.deep.equal(new Point3D(-20,-1133,1061))
            expect(scanner0?.scannerPositions()[3]).to.deep.equal(new Point3D(1105,-1205,1229))
            expect(scanner0?.scannerPositions()[4]).to.deep.equal(new Point3D(-92,-2380,-20))
            expect(scanner0?.beaconCount()).to.equal(79);
        }).timeout(2500);

        it("Handle provided example data in a loop", () => {
            const inputFile = `${__dirname}/test-data/1.txt`;
            const input = readInput(inputFile);

            let scanners = parseScanners3D(input);           
            const scanner0 = scanners[0];
            scanners.splice(0, 1);
            
            while(scanners.length > 0) {
                for (let i = 0; i < scanners.length; i++) {
                    const comparisonScanner = scanners[i];
                    const result = scanner0.tryToAlign(comparisonScanner, 12);
                    if (result !== null) {
                        scanner0.join(result);
                        scanners.splice(i, 1);
                        break;
                    }

                }
            }
            
            expect(scanner0.scannerPositions().length).to.equal(5);
            expect(scanner0.beaconCount()).to.equal(79);
        }).timeout(5500);
    })
});

const createScannerWithPoints = (name: string, points: [number, number, number][]): Scanner3D => {
    const scanner = new Scanner3D(name);
    for (const [x, y, z] of points) {
        scanner.addBeacon(new Point3D(x, y, z));
    }
    return scanner;
}

