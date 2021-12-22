import { MirrorDirection, Point2D } from "../helpers/Point2D";
import { BeaconPlane } from "./BeaconPlane";
import _ from "lodash"

export class Scanner2D {
    private _name: string;
    private _plane: BeaconPlane;
    private _scannerPositions: Point2D[];

    constructor(name: string) {
        this._name = name;
        this._plane = new BeaconPlane();
        this._scannerPositions = [new Point2D(0,0)];
    }

    name(): string {
        return this._name;
    }

    plane(): BeaconPlane {
        return this._plane;
    }

    scannerPositions(): Point2D[] {
        return this._scannerPositions;
    }

    addBeacon(point: Point2D) {
        this._plane.add(point);
    }

    join(scanner: Scanner2D) {
        for (const s of scanner._scannerPositions) {
            if (!this.hasScanner(s.x, s.y)) {
                this._scannerPositions.push(s);
            }
        }

        for (const b of scanner._plane.beacons()) {
            if (!this._plane.hasBeacon(b.x, b.y)) {
                this.addBeacon(b);
            }
        }
    }

    beaconCount(): number {
        return this._plane.beacons().length;
    }

    tryToAlign(scannerB: Scanner2D, requiredMatches: number): Scanner2D | null {
        let currentResult = this.tryAlignAllRotations(scannerB, requiredMatches);

        if (currentResult === null) {
            // Horizontal
            const testScanner = scannerB.copy();
            //console.log("FLIPPING HORIZONTALLY")
            testScanner.mirror(MirrorDirection.Horizontally)
            currentResult = this.tryAlignAllRotations(testScanner, requiredMatches);
        }

        if (currentResult === null) {
            // Horizontal
            const testScanner = scannerB.copy();
            //console.log("FLIPPING VERTICALLY")
            testScanner.mirror(MirrorDirection.Vertically)
            currentResult = this.tryAlignAllRotations(testScanner, requiredMatches);
        }

        return currentResult;
    }

    // PRIVATE STUFF ==============================================
    private tryAlignAllRotations(scannerB: Scanner2D, requiredMatches: number): Scanner2D | null {
        let rotations = 4;
        
        // Rotations
        while(rotations > 0) {
            const aProbes = this._plane.beacons();
            const bProbes = scannerB._plane.beacons();

            // Move B through all points
            for (let aIndex = 0; aIndex < aProbes.length; aIndex++) {
               for (let bIndex = 0; bIndex < bProbes.length; bIndex++) {
                   const vectorX = aProbes[aIndex].x - bProbes[bIndex].x;
                   const vectorY = aProbes[aIndex].y - bProbes[bIndex].y;
                   const vector = new Point2D(vectorX, vectorY)

                   const testScanner = scannerB.copy();

                   //console.log("MOVING: " + vector)
                   testScanner.move(vector)

                   if (this._plane.isAligned(testScanner._plane, requiredMatches)) {
                    //console.log("ALIGNED!");
                    return testScanner
                }
               }
            }

            //console.log("ROTATING");
            scannerB.rotateCW();
            rotations--;
        }

        return null;
    }

    private rotateCW() {
        this._plane.rotateCW();
    }

    private move(velocity: Point2D) {
        this._plane.move(velocity);
        for (const scanner of this._scannerPositions) {
            scanner.move(velocity);
        }
    }

    private mirror(direction: MirrorDirection) {
        this._plane.mirror(direction)
    }

    private copy(): Scanner2D {
        const newScanner = _.cloneDeep(this);
        return newScanner;
    }

    private hasScanner(x: number, y: number): boolean {
        for (const pos of this._scannerPositions) {
            if (pos.equals(new Point2D(x, y))) {
                return true;
            }
        }
        return false;
    }

    // DEBUG STUFF ================================================

    draw() {
        const xValues = [...this._plane.beacons().map((p) => p.x), ...this._scannerPositions.map((s) => s.x)]
        const yValues = [...this._plane.beacons().map((p) => p.y), ...this._scannerPositions.map((s) => s.y)]
        
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);

        for (let y = maxY; y >= minY; y--) {
            let row = "";
            for (let x = minX; x <= maxX; x++) {
                if (this.hasScanner(x, y)) {
                    row += "S"
                }
                else if (this._plane.hasBeacon(x, y))
                    row += "B"
                else
                    row += "."
            }
            console.log(row);
        }
        console.log();
    }

    debug() {
        for (const probe of this._plane.beacons()) {
            console.log(`X: ${probe.x}, Y: ${probe.y}`)
        }
    }
}
