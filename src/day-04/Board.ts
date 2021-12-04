export interface Tile {
    number: number;
    selected: boolean;
}

export class Board {
    board: Tile[][];
    rowSelections = new Map<number, number>();
    colSelections = new Map<number, number>();
    numberToPosition = new Map<number, { y: number, x: number }>();

    constructor(numbers: number[][]) {
        this.board = [];
        numbers.forEach((row, x) => {
            this.board.push(row.map((n) => ({ number: n, selected: false })));
            row.forEach((number, y) => this.numberToPosition.set(number, { x, y }))
        });
    }

    markSelected(number: number) {
        const position = this.numberToPosition.get(number);
        if (position) {
            const rowSelection = this.rowSelections.get(position.x) || 0;
            const colSelection = this.colSelections.get(position.y) || 0;
            this.rowSelections.set(position.x, rowSelection + 1);
            this.colSelections.set(position.y, colSelection + 1);
            this.board[position.x][position.y].selected = true;
        }
    }

    hasBingo(): boolean {
        for (let i = 0; i < 5; i++) {
            if (this.colSelections.get(i) === 5 || this.rowSelections.get(i) === 5) {
                return true;
            }
        }
        return false;
    }

    unmarkedSum(): number {
        let sum = 0;
        for (const row of this.board) {
            for (const tile of row) {
                if (!tile.selected) sum += tile.number;
            }
        }
        return sum;
    }

    debug(): void {
        for (const row of this.board) {
            console.log(row.map((tile) => tile.selected ? `[${tile.number}]` : ` ${tile.number} `))
        }
    }

    static createBoardsFromInput(input: string[]): Board[] {
        let x = 0;
        let y = 0;
        let board: number[][] = []
        const boards: Board[] = [];
        for (const line of input) {
            if (line.length === 14) { // Board numbers
                const numbers = line.split(" ").map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
                board.push(numbers);
            } else if (line.length === 0) { // Board break
                x = 0;
                y = 0;
                if (board.length > 0) {
                    boards.push(new Board(board));
                    board = [];
                }
            }
        }
        boards.push(new Board(board));
        return boards;
    }

}
