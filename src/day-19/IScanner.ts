export interface IScanner<T> {
    name(): string;
    scannerPositions(): T[];
    addBeacon(point: T): void;
    join(scanner: IScanner<T>): void;
    beaconCount(): number;
    tryToAlign(scannerB: IScanner<T>, requiredMatches: number): IScanner<T> | null
}
