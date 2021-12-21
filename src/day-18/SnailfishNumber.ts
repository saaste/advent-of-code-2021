import { v4 as uuidv4 } from 'uuid';

enum ReduceType {
    Explode = "explode",
    Split = "split"
}

export class SnailfishNumber {
    id: string;
    left: number | SnailfishNumber;
    right: number | SnailfishNumber;
    depth: number;
    parent: SnailfishNumber | null;

    constructor(left: number | SnailfishNumber, right: number | SnailfishNumber, depth: number = 1, parent: SnailfishNumber | null = null) {
        this.depth = depth;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.id = uuidv4();
    }

    static from(str: string, index: number = 0, depth: number = 0, parent: SnailfishNumber | null = null): SnailfishNumber {
        const numberRegEx = /^(\d+)/g

        let currentNumber: SnailfishNumber = new SnailfishNumber(Infinity, Infinity, depth, parent);
        let isOpen: boolean = false;
        let i = index;

        while (i < str.length) {
            if (str[i] === "[") {
                if (isOpen) {
                    const subNumber = SnailfishNumber.from(str, i, depth + 1, currentNumber)
                    currentNumber.setValue(subNumber);
                    i = i + subNumber.toString().length;
                    continue;
                } else {
                    isOpen = true;
                }
            } else if (numberRegEx.test(str[i])) {
                const result = str.substring(i, str.length).match(numberRegEx);
                if (result === null) throw new Error("Parsing the number failed");
                currentNumber.setValue(parseInt(result[0], 10));
                i += result[0].length;
                continue;
            } else if (str[i] === "]") {
                return currentNumber;
            }
            i++;
        }

        return currentNumber;
    }

    equals(b: any) {
        return b !== undefined && b instanceof SnailfishNumber && b.id === this.id
    }

    toString(): string {
        let leftStr: string;
        let rightStr: string;

        if (typeof this.left === "number") {
            leftStr = (this.left as number).toString();
        } else {
            leftStr = (this.left as SnailfishNumber).toString();
        }

        if (typeof this.right === "number") {
            rightStr = (this.right as number).toString();
        } else {
            rightStr = (this.right as SnailfishNumber).toString();
        }

        return `[${leftStr},${rightStr}]`
    }

    printStructure(padding: number = 0): void {
        console.log(`${" ".repeat(padding)}- Depth: ${this.depth}`);
        if (typeof this.left === "number") {
            console.log(`${" ".repeat(padding)}  Left:  ${this.left}`);
        } else {
            (this.left as SnailfishNumber).printStructure(padding + 3);
        }

        if (typeof this.right === "number") {
            console.log(`${" ".repeat(padding)}  Right: ${this.right}`);
        } else {
            (this.right as SnailfishNumber).printStructure(padding + 3);
        }
    }

    add(b: SnailfishNumber): SnailfishNumber {
        const sumStr = `[${this.toString()},${b.toString()}]`;
        return SnailfishNumber.from(sumStr)
    }

    private setValue(value: number | SnailfishNumber): void {
        if (this.left === Infinity) {
            this.left = value;
        } else {
            this.right = value;
        }
    }

    private checkExplosionNeeded(): SnailfishNumber | null {
        if (this.depth >= 4 && this.isNumberic()) {
            return this;
        }

        if (this.left instanceof SnailfishNumber) {
            const result = this.left.checkExplosionNeeded();
            if (result !== null) return result;
        }

        if (this.right instanceof SnailfishNumber) {
            const result = this.right.checkExplosionNeeded();
            if (result !== null) return result;
        }

        return null;
    }

    private checkSplitNeeded(): SnailfishNumber | null {
        if (typeof this.left === "number" && this.left >= 10) {
            return this;
        }

        if (this.left instanceof SnailfishNumber) {
            const result = this.left.checkSplitNeeded();
            if (result !== null) return result;
        }

        if (typeof this.right === "number" && this.right >= 10) {
            return this;
        }

        if (this.right instanceof SnailfishNumber) {
            const result = this.right.checkSplitNeeded();
            if (result !== null) return result;
        }

        return null;
    }

    reduce(): void {
        let explodeNeed = this.checkExplosionNeeded();
        let splitNeed = this.checkSplitNeeded();
        //console.log("Start: " + this.toString());
        while (explodeNeed || splitNeed) {
            if (explodeNeed !== null) {
                explodeNeed.explode();
                //console.log("After explode: " + this.toString());
                explodeNeed = this.checkExplosionNeeded();
                splitNeed = this.checkSplitNeeded();
                continue;
            }

            if (splitNeed !== null) {
                splitNeed.split();
                //console.log("After split: " + this.toString());
                explodeNeed = this.checkExplosionNeeded();
                splitNeed = this.checkSplitNeeded();
                continue;
            }
        }
    }

    magnitude(): number {
        let leftMagnitude = 0;
        let rightMagnitude = 0;

        if (this.left instanceof SnailfishNumber) {
            leftMagnitude = 3 * this.left.magnitude();
        } else {
            leftMagnitude = 3 * this.left as number;
        }

        if (this.right instanceof SnailfishNumber) {
            rightMagnitude = 2 * this.right.magnitude();
        } else {
            rightMagnitude = 2 * this.right as number;
        }

        return leftMagnitude + rightMagnitude;
    }

    private explode() {
        const parent = this.parent as SnailfishNumber;

        this.addToLeft(this, this.left as number);
        this.addToRight(this, this.right as number);
        //this.addToClosestRegularLeft(this.left as number);
        //this.addToClosestRegularRight(this.right as number);

        if (this.equals(parent.left)) {
            parent.left = 0;
        } else {
            parent.right = 0;
        }
    }

    private split(): void {
        if (typeof this.left === "number" && this.left >= 10) {
            const newLeft = Math.floor(this.left / 2);
            const newRight = Math.ceil(this.left / 2);
            this.left = new SnailfishNumber(newLeft, newRight, this.depth + 1, this);
            return;
        }

        if (typeof this.right === "number" && this.right >= 10) {
            const newLeft = Math.floor(this.right / 2);
            const newRight = Math.ceil(this.right / 2);
            this.right = new SnailfishNumber(newLeft, newRight, this.depth + 1, this);
            return;
        }
    }



    private isNumberic(): boolean {
        return typeof this.left === "number" && typeof this.right === "number";
    }

    private addToLeft(current: SnailfishNumber, value: number): void {
        const parent = current.parent;
        // Jos nykyinen kuuluu vanhemman oikealle puolelle
        if (current.equals(parent?.right)) {
            if (typeof parent?.left === "number") {
                // Jos numero: lisätään vanhemman vasempaa numeroon
                parent.left += value;
                return;
            } else if (parent?.left instanceof SnailfishNumber) {
                // Kysymyksessä on sisar, lähdetään porautumaan sinne
                this.updateNextNumberLeft(parent?.left, value);
                return;
            } else if (parent !== null) {
                // Muuten jatketaan seuraavaan vanhempaan jos sellainen löytyy
                current.addToLeft(parent, value);
            } else {
                throw new Error("Tätä ei pitäisi tapahtua 1");
            }
        } else {
            // Jos nykyinen kuuluu vanhemman vasemmalle puolelle
            if (parent !== null) {
                current.addToLeft(parent, value);
            }
        }
    }

    private addToRight(current: SnailfishNumber, value: number): void {
        const parent = current.parent;
        // Jos nykyinen kuuluu vanhemman vasemmalle puolelle
        if (current.equals(parent?.left)) {
            if (typeof parent?.right === "number") {
                // jos numero: lisätään vanhemman oikeaan numberoon
                parent.right += value;
                return;
            } else if (parent?.right instanceof SnailfishNumber) {
                // Kysymyksessä on sisar, lähdetään porautumaan sinne
                this.updateNextNumberRight(parent?.right, value);
                return;
            } else if (parent !== null) {
                current.addToRight(parent, value);
            } else {
                throw new Error("Tätä ei pitäisi tapahtua 2");
            }
        } else {
            // Jos nykyinen kuuluu vanhemman oikealle puolelle
            if (parent !== null) {
                current.addToRight(parent, value);
            }
        }
    }

    private updateNextNumberRight(current: SnailfishNumber, value: number): void {
        if (typeof current.left === "number") {
            current.left += value;
        } else {
            this.updateNextNumberRight(current.left as SnailfishNumber, value);
        }
    }

    private updateNextNumberLeft(current: SnailfishNumber, value: number): void {
        if (typeof current.right === "number") {
            current.right += value;
        } else {
            this.updateNextNumberLeft(current.right as SnailfishNumber, value);
        }
    }

}
