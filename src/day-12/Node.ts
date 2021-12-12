export class Node {
    name: string;
    isBig: boolean;
    isStart: boolean;
    isEnd: boolean;
    neighbours: string[];

    constructor(name: string) {
        this.name = name;
        this.isBig = name === name.toUpperCase();
        this.isStart = name === "start";
        this.isEnd = name === "end";
        this.neighbours = [];
    }

    addNeighbour(name: string) {
        this.neighbours.push(name);
        this.neighbours.sort((a, b) => {
            if (a === "end") {
                return 1
            } else if (b === "end") {
                return -1
            }

            const alc = a.toLowerCase();
            const blc = b.toLowerCase();

            if (alc < blc) return -1;
            else if (alc > blc) return 1;
            else return 0;

        });
    }
}
