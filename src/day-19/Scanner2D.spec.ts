import { Point2D } from "../helpers/Point2D";
import { Scanner2D } from "./Scanner2D";
import { expect } from "chai";

describe("Scanner2D", () => {

    describe("Auto-align", () => {
        it("Finds and joins matching data", () => {
            const scannerA = createScannerWithPoints("Scanner A", [
                [0,2], [4,1], [3,3]
            ]);
            const scannerB = createScannerWithPoints("Scanner B", [
                [-1,-1], [-5,0], [-2,1]
            ]);

            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
            
            scannerA.join(result as Scanner2D);
            expect(scannerA.plane().hasBeacon(4,1)).to.equal(true);
            expect(scannerA.plane().hasBeacon(0,2)).to.equal(true);
            expect(scannerA.plane().hasBeacon(3,3)).to.equal(true);
            expect(scannerA.beaconCount()).to.eq(3);
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(0, 0))
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(5, 2))
        });

        it("Rotates, finds and joins matching data", () => {
            const scannerA = createScannerWithPoints("Scanner A", [
                [0,2], [4,1], [3,3]
            ]);
            const scannerB = createScannerWithPoints("Scanner B", [
                [0,2], [2,3], [1,6]
            ]);

            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
            
            scannerA.join(result as Scanner2D);
            expect(scannerA.plane().hasBeacon(4,1)).to.equal(true);
            expect(scannerA.plane().hasBeacon(0,2)).to.equal(true);
            expect(scannerA.plane().hasBeacon(3,3)).to.equal(true);
            expect(scannerA.beaconCount()).to.eq(3);
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(0, 0))
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(6,1))
        });

        it("Flips horizontally, finds and joins matching data", () => {
            const scannerA = createScannerWithPoints("Scanner A", [
                [0,2], [4,1], [3,3]
            ]);
            const scannerB = createScannerWithPoints("Scanner B", [
                [0,2], [-4,1], [-3,3]
            ]);

            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
            
            scannerA.join(result as Scanner2D);
            expect(scannerA.plane().hasBeacon(4,1)).to.equal(true);
            expect(scannerA.plane().hasBeacon(0,2)).to.equal(true);
            expect(scannerA.plane().hasBeacon(3,3)).to.equal(true);
            expect(scannerA.beaconCount()).to.eq(3);
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(0, 0))
            expect(scannerA.scannerPositions()).has.lengthOf(1);
        });

        it("Flips vertically, finds and joins matching data", () => {
            const scannerA = createScannerWithPoints("Scanner A", [
                [0,2], [4,1], [3,3]
            ]);
            const scannerB = createScannerWithPoints("Scanner B", [
                [0,-2], [4,-1], [3,-3]
            ]);

            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
            
            scannerA.join(result as Scanner2D);
            expect(scannerA.plane().hasBeacon(4,1)).to.equal(true);
            expect(scannerA.plane().hasBeacon(0,2)).to.equal(true);
            expect(scannerA.plane().hasBeacon(3,3)).to.equal(true);
            expect(scannerA.beaconCount()).to.eq(3);
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(0, 0))
            expect(scannerA.scannerPositions()).has.lengthOf(1);
        });

        it("Flips horizontally, finds and joins matching data", () => {
            const scannerA = createScannerWithPoints("Scanner A", [
                [0,2], [4,1], [3,3]
            ]);
            const scannerB = createScannerWithPoints("Scanner B", [
                [0,-2], [-4,-1], [-3,-3]
            ]);

            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
            
            scannerA.join(result as Scanner2D);
            expect(scannerA.plane().hasBeacon(4,1)).to.equal(true);
            expect(scannerA.plane().hasBeacon(0,2)).to.equal(true);
            expect(scannerA.plane().hasBeacon(3,3)).to.equal(true);
            expect(scannerA.beaconCount()).to.eq(3);
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(0, 0))
            expect(scannerA.scannerPositions()).has.lengthOf(1);
        });

        it("Finds and joins matching data when there are extra points", () => {
            const scannerA = createScannerWithPoints("Scanner A", [
                [0,2], [4,1], [3,3], [4,4]
            ]);
            const scannerB = createScannerWithPoints("Scanner B", [
                [0,-2], [4,-1], [3,-3], [5,1], [3,-2]
            ]);

            const result = scannerA.tryToAlign(scannerB, 3);
            expect(result).to.not.be.null;
            
            scannerA.join(result as Scanner2D);
            expect(scannerA.plane().hasBeacon(4,1)).to.equal(true);
            expect(scannerA.plane().hasBeacon(0,2)).to.equal(true);
            expect(scannerA.plane().hasBeacon(3,3)).to.equal(true);
            expect(scannerA.plane().hasBeacon(4,4)).to.equal(true);
            expect(scannerA.plane().hasBeacon(5,-1)).to.equal(true);
            expect(scannerA.plane().hasBeacon(3,2)).to.equal(true);
            expect(scannerA.beaconCount()).to.eq(6);
            expect(scannerA.scannerPositions()).to.deep.include(new Point2D(0, 0))
            expect(scannerA.scannerPositions()).has.lengthOf(1);
        });
    });
});

const createScannerWithPoints = (name: string, points: [number, number][]): Scanner2D => {
    const scanner = new Scanner2D(name);
    for (const [x, y] of points) {
        scanner.addBeacon(new Point2D(x, y));
    }
    return scanner;
}
