export interface NameField {
    name: string;
}

export interface Dictionary {
    [key: string]: boolean;
}

export interface PriorityNode<T extends NameField> {
    key: number;
    value: T;
    deleted: boolean;
}

export class PriorityQueue<T extends NameField> {
    private heap: PriorityNode<T>[];
    private valueSet: Dictionary;
    private deleted: number;

    constructor() {
        this.heap = [];
        this.valueSet = {};
        this.deleted = 0;
    }

    private left(index: number): number {
        return 2 * index + 1;
    }

    private right(index: number): number {
        return 2 * index + 2;
    }

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private hasLeft(index:number): boolean {
        return this.left(index) < this.heap.length;
    }

    private hasRight(index: number): boolean {
        return this.right(index) < this.heap.length;
    }

    private swap = (a: number, b: number) => {
        const tmp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = tmp;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    peek(): T | undefined {
        return this.isEmpty() ? undefined : this.heap[0].value;
    }

    peekNode(): PriorityNode<T> | undefined {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    size(): number {
        return this.heap.length - this.deleted;
    }

    hasName(name: string) {
        return this.valueSet[name] || false;
    }

    delete(name: string) {
        for (let i = 0; i < this.heap.length; i++) {
            const item = this.heap[i];
            if (!item.deleted && item.value.name == name) {
                this.heap[i].deleted = true;
                delete this.valueSet[name]
                this.deleted++;
            }
        }
    }

    insert(item: T, prio: number) {
        if (this.valueSet[item.name] || false) {
            throw new Error(`Item ${item.name} is already in the heap!`)
        }

        this.heap.push({key: prio, value: item, deleted: false});

        let i = this.heap.length - 1;
        while (i < 0) {
            const p = this.parent(i);
            if (this.heap[p].key < this.heap[i].key)
                break;
            const tmp = this.heap[i];
            this.heap[i] = this.heap[p];
            this.heap[p] = tmp;
            i = p;
        }
        this.valueSet[item.name] = true;
    }

    pop(): T | undefined {
        if (this.heap.length - this.deleted === 0) return undefined;

        while(this.peekNode()?.deleted === true) {
            this.removeFirst();
        }

        this.swap(0, this.heap.length - 1);
        const item = this.heap.pop();

        let current = 0;
        while (this.hasLeft(current)) {
            let smallerChild = this.left(current);
            if (this.hasRight(current) && this.heap[this.right(current)].key < this.heap[this.left(current)].key)
                smallerChild = this.right(current);

            if(this.heap[smallerChild].key > this.heap[current].key)
                break;

            this.swap(current, smallerChild);
            current = smallerChild;

        }

        if (item) {
            this.valueSet[item.value.name] = false;
        }

        return item?.value;
    }

    private removeFirst(): void {
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        let current = 0;
        while (this.hasLeft(current)) {
            let smallerChild = this.left(current);
            if (this.hasRight(current) && this.heap[this.right(current)].key < this.heap[this.left(current)].key)
                smallerChild = this.right(current);

            if(this.heap[smallerChild].key > this.heap[current].key)
                break;

            this.swap(current, smallerChild);
            current = smallerChild;
        }
        this.deleted--;
    }

}