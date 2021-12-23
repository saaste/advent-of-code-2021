import { MirrorDirection, Point2D } from "../helpers/Point2D";
import _ from "lodash";
export class BeaconPlane {
    private _beacons: Map<string, Point2D>;

    constructor() {
        this._beacons = new Map();
    }

    add(beacon: Point2D) {
        this._beacons.set(this.key(beacon), beacon);
    }

    hasBeacon(x: number, y: number): boolean {
        return this._beacons.get(this.key(new Point2D(x, y))) !== undefined
    }

    beacons(): Point2D[] {
        return [...this._beacons.values()];
    }

    isAligned(planeB: BeaconPlane, requiredMatches: number): boolean {
        const matchingPoints: Point2D[] = [];

        const probesA = this.beacons();
        const probesB = planeB.beacons();

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

    // Rotate plane 90 degreed clock-wise
    rotateCW() {
        const allBeacons = [...this._beacons.values()];
        const newBeacons: Map<string, Point2D> = new Map();
        for (const probe of allBeacons) {
            probe.rotateCW();
            newBeacons.set(this.key(probe), probe);
        }
        this._beacons = newBeacons
    }

    move(velocity: Point2D): void {
        const newBeacons: Map<string, Point2D> = new Map();
        const beacons = this.beacons();
        for(const beacon of beacons) {
            beacon.move(velocity);
            newBeacons.set(this.key(beacon), beacon);
        }
        this._beacons = newBeacons;
    }

    mirror(direction: MirrorDirection): void {
        const newBeacons: Map<string, Point2D> = new Map();
        const beacons = this.beacons();

        for(const beacon of beacons) {
            beacon.mirror(direction);
            newBeacons.set(this.key(beacon), beacon);
        }

        this._beacons = newBeacons;
    }

    copy(): BeaconPlane {
        return _.cloneDeep(this);
    }

    private get(x: number, y: number): Point2D | null {
        const point = new Point2D(x, y);
        return this._beacons.get(this.key(point)) || null;
    }

    private key(point: Point2D): string {
        return `${point.x},${point.y}`
    }
}
