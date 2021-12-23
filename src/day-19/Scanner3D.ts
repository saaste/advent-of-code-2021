import _ from "lodash";
import { Axis } from "../helpers/Point2D";
import { Point3D } from "../helpers/Point3D";
import { BeaconCube } from "./BeaconCube";
import { IScanner } from "./IScanner";

export class Scanner3D implements IScanner<Point3D> {
    private _name: string;
    private _cube: BeaconCube;
    private _scannerPositions: Point3D[];

    constructor(name: string) {
        this._name = name;
        this._cube = new BeaconCube();
        this._scannerPositions = [new Point3D(0,0,0)];
    }

    name(): string {
        return this._name;
    }

    cube(): BeaconCube {
        return this._cube;
    }

    scannerPositions(): Point3D[] {
        return this._scannerPositions;
    }

    addBeacon(point: Point3D) {
        this._cube.add(point);
    }

    join(scanner: Scanner3D) {
        for (const s of scanner._scannerPositions) {
            if (!this.hasScanner(s.x, s.y, s.z)) {
                this._scannerPositions.push(s);
            }
        }

        for (const b of scanner._cube.beacons()) {
            if (!this._cube.hasBeacon(b.x, b.y, b.z)) {
                this.addBeacon(b);
            }
        }
    }

    beaconCount(): number {
        return this._cube.beacons().length;
    }

    tryToAlign(scannerB: Scanner3D, requiredMatches: number): Scanner3D | null {
        if (this._cube.isAligned(scannerB._cube, requiredMatches)) {
            return scannerB;
        }

    //      +--------+
    //     /        /|
    //    /   3    / |
    //   +--------+  |    Follow die logic: sum of opposite side is 7
    //   |        | 2|
    //   |        |  +
    //   |   1    | /
    //   |        |/
    //   +--------+


        // Face 1 with all four rotations (front)
        let result = this.tryAlignAllRotations(scannerB, requiredMatches);
        if (result !== null) return result;
        
        // Face 2 with all four rotations (right)
        scannerB.rotateAroundY();
        result = this.tryAlignAllRotations(scannerB, requiredMatches);
        if (result !== null) return result;

        // Face 6 with all four rotations (back)
        scannerB.rotateAroundY();
        result = this.tryAlignAllRotations(scannerB, requiredMatches);
        if (result !== null) return result;

        // Face 5 with all four rotations (left)
        scannerB.rotateAroundY();
        result = this.tryAlignAllRotations(scannerB, requiredMatches);
        if (result !== null) return result;

        scannerB.rotateAroundY() // Now we are facing 1 again
        
        // Face 4 with all four rotations (bottom)
        scannerB.rotateAroundX()
        result = this.tryAlignAllRotations(scannerB, requiredMatches);
        if (result !== null) return result;

        // Face 3 with all four rotations (top)
        scannerB.rotateAroundX()
        scannerB.rotateAroundX()
        result = this.tryAlignAllRotations(scannerB, requiredMatches);
        return result;



        // if (result === null) {
        //     // Flip around X
        //     // console.log("Mirror X")
        //     scannerB.mirror(Axis.X)
        //     result = this.tryAlignAllRotations(scannerB, requiredMatches);
        //     scannerB.mirror(Axis.X)
        // }

        // if (result === null) {
        //     // Flip around Y
        //     // console.log("Mirror Y")
        //     scannerB.mirror(Axis.Y)
        //     result = this.tryAlignAllRotations(scannerB, requiredMatches);
        //     scannerB.mirror(Axis.Y)
        // }

        // if (result === null) {
        //     // Flip around Z
        //     // console.log("Mirror Z")
        //     scannerB.mirror(Axis.Z)
        //     result = this.tryAlignAllRotations(scannerB, requiredMatches);
        //     scannerB.mirror(Axis.Z)
        // }

        // if (result === null) {
        //     // Flip around X and Y
        //     // console.log("Mirror X & Y")
        //     scannerB.mirror(Axis.X)
        //     scannerB.mirror(Axis.Y)
        //     result = this.tryAlignAllRotations(scannerB, requiredMatches);
        //     scannerB.mirror(Axis.X)
        //     scannerB.mirror(Axis.Y)
        // }

        
        return result;
    }

    // PRIVATE STUFF ============================================================

    tryAlignAllRotations(scannerB: Scanner3D, requiredMatches: number): Scanner3D | null {
        // Rotations around Z axis
        let rotations = 4;
        while (rotations > 0) {
            const aProbes = this._cube.beacons();
            const bProbes = scannerB._cube.beacons();
            for (let aIndex = 0; aIndex < aProbes.length; aIndex++) {
                for (let bIndex = 0; bIndex < bProbes.length; bIndex++) {
                    const vectorX = aProbes[aIndex].x - bProbes[bIndex].x;
                    const vectorY = aProbes[aIndex].y - bProbes[bIndex].y;
                    const vectorZ = aProbes[aIndex].z - bProbes[bIndex].z;
                    const vector = new Point3D(vectorX, vectorY, vectorZ);
    
                    const testScanner = scannerB.copy();
    
                    //console.log("MOVING: " + vector)
                    testScanner.move(vector)
    
                    //console.log(`Comparing ${this._cube.beacons().map((v) => `[${v.toString()}]`)} to ${testScanner._cube.beacons().map((v) => `[${v.toString()}]`)}`);
                    if (this._cube.isAligned(testScanner._cube, requiredMatches)) {
                        //console.log("ALIGNED!");
                        return testScanner
                    }
                }
             }

            //  console.log("ROTATING AROUND Z")
             scannerB.rotateAroundZ();
             rotations--;
        }

        // // Rotations around x axis
        // rotations = 4;
        // while (rotations > 0) {
        //     const aProbes = this._cube.beacons();
        //     const bProbes = scannerB._cube.beacons();
        //     for (let aIndex = 0; aIndex < aProbes.length; aIndex++) {
        //         for (let bIndex = 0; bIndex < bProbes.length; bIndex++) {
        //             const vectorX = aProbes[aIndex].x - bProbes[bIndex].x;
        //             const vectorY = aProbes[aIndex].y - bProbes[bIndex].y;
        //             const vectorZ = aProbes[aIndex].z - bProbes[bIndex].z;
        //             const vector = new Point3D(vectorX, vectorY, vectorZ);
    
        //             const testScanner = scannerB.copy();
    
        //             //console.log("MOVING: " + vector)
        //             testScanner.move(vector)
    
        //             if (this._cube.isAligned(testScanner._cube, requiredMatches)) {
        //                 //console.log("ALIGNED!");
        //                 return testScanner
        //             }
        //         }
        //      }

        //      console.log("ROTATING AROUND X");
        //      scannerB.rotateAroundX();
        //      rotations--;
        // }

        // // Rotations around y axis
        // rotations = 4;
        // while (rotations > 0) {
        //     const aProbes = this._cube.beacons();
        //     const bProbes = scannerB._cube.beacons();
        //     for (let aIndex = 0; aIndex < aProbes.length; aIndex++) {
        //         for (let bIndex = 0; bIndex < bProbes.length; bIndex++) {
        //             const vectorX = aProbes[aIndex].x - bProbes[bIndex].x;
        //             const vectorY = aProbes[aIndex].y - bProbes[bIndex].y;
        //             const vectorZ = aProbes[aIndex].z - bProbes[bIndex].z;
        //             const vector = new Point3D(vectorX, vectorY, vectorZ);
    
        //             const testScanner = scannerB.copy();
    
        //             //console.log("MOVING: " + vector)
        //             testScanner.move(vector)
    
        //             if (this._cube.isAligned(testScanner._cube, requiredMatches)) {
        //                 //console.log("ALIGNED!");
        //                 return testScanner
        //             }
        //         }
        //      }

        //      console.log("ROTATING AROUND Y");
        //      scannerB.rotateAroundY();
        //      rotations--;
        // }
        return null;
    }

    private mirror(axis: Axis) {
        this._cube.mirror(axis)
    }

    private rotateAroundZ() {
        for (const scanner of this._scannerPositions) {
            scanner.rotateAroundZ();
        }
        this._cube.rotateAroundZ();
    }

    private rotateAroundX() {
        for (const scanner of this._scannerPositions) {
            scanner.rotateAroundX();
        }
        this._cube.rotateAroundX();
    }

    private rotateAroundY() {
        for (const scanner of this._scannerPositions) {
            scanner.rotateAroundY();
        }
        this._cube.rotateAroundY();
    }

    private move(velocity: Point3D) {
        this._cube.move(velocity);
        for (const scanner of this._scannerPositions) {
            scanner.move(velocity);
        }
    }

    private copy(): Scanner3D {
        return _.cloneDeep(this);
    }

    private hasScanner(x: number, y: number, z: number): boolean {
        for (const pos of this._scannerPositions) {
            if (pos.equals(new Point3D(x, y, z))) {
                return true;
            }
        }
        return false;
    }
}
