export class Node {
    private energy: number;
    private flashed: boolean;

    constructor(energy: number) {
        this.energy = energy;
        this.flashed = false;
    }

    getEnergy(): number {
        return this.energy;
    }

    getFlashed(): boolean {
        return this.flashed;
    }

    increaseEnergy(): void {
        this.energy++;
    }

    resetNode(): void {
        if (this.energy > 9) {
            this.energy = 0;
        }
        this.flashed = false;
    }

    flash(): void {
        this.flashed = true;
    }
}
