import { Point3D } from "../helpers/Point3D";
import _ from "lodash";
import { stringify } from "querystring";
import { Axis } from "../helpers/Point2D";

export class BeaconCube {
    private _beacons: Map<string, Point3D>;
    
    constructor() {
        this._beacons = new Map();
    }

    add(beacon: Point3D) {
        this._beacons.set(this.key(beacon), beacon);
    }

    hasBeacon(x: number, y: number, z:number): boolean {
        return this._beacons.get(this.key(new Point3D(x, y, z))) !== undefined
    }

    beacons(): Point3D[] {
        return [...this._beacons.values()];
    }

    isAligned(cubeB: BeaconCube, requiredMatches: number): boolean {
        const matchingPoints: Point3D[] = [];

        const probesA = this.beacons();
        const probesB = cubeB.beacons();

        for (const probeA of probesA) {
            for (let i = 0; i < probesB.length; i++) {
                if (probeA.equals(probesB[i])) {
                    matchingPoints.push(probesB[i]);
                    probesB.splice(i, 1);
                    break;
                }
            }
            if (matchingPoints.length >= requiredMatches)
                break;
        }

        return matchingPoints.length >= requiredMatches
    }


    copy(): BeaconCube {
        return _.cloneDeep(this);
    }

    move(velocity: Point3D): void {
        const newBeacons: Map<string, Point3D> = new Map();
        const beacons = this.beacons();
        for(const beacon of beacons) {
            beacon.move(velocity);
            newBeacons.set(this.key(beacon), beacon);
        }
        this._beacons = newBeacons;
    }

    mirror(axis: Axis): void {
        const newBeacons: Map<string, Point3D> = new Map();
        const beacons = this.beacons();

        for(const beacon of beacons) {
            beacon.mirror(axis);
            newBeacons.set(this.key(beacon), beacon);
        }

        this._beacons = newBeacons;
    }

    // Rotate plane 90 degrees around Z axis
    rotateAroundZ() {
        const allBeacons = [...this._beacons.values()];
        const newBeacons: Map<string, Point3D> = new Map();

        for (const probe of allBeacons) {
            probe.rotateAroundZ();
            newBeacons.set(this.key(probe), probe);
        }
        this._beacons = newBeacons;
    }

    rotateAroundX() {
        const allBeacons = [...this._beacons.values()];
        const newBeacons: Map<string, Point3D> = new Map();

        for (const probe of allBeacons) {
            probe.rotateAroundX();
            newBeacons.set(this.key(probe), probe);
        }
        this._beacons = newBeacons;
    }

    rotateAroundY() {
        const allBeacons = [...this._beacons.values()];
        const newBeacons: Map<string, Point3D> = new Map();

        for (const probe of allBeacons) {
            probe.rotateAroundY();
            newBeacons.set(this.key(probe), probe);
        }
        this._beacons = newBeacons;
    }

    private key(point: Point3D): string {
        return `${point.x},${point.y},${point.z}`
    }
}
