import { readInput } from "../helpers/input";

const inputFile = `${__dirname}/../../inputs/day-21.txt`;

class GameState {
    position1: number;
    position2: number;
    points1: number;
    points2: number;

    constructor(position1: number, position2: number, points1: number, points2: number) {
        this.position1 = position1;
        this.position2 = position2;
        this.points1 = points1;
        this.points2 = points2;
    }

    key(): string {
        return `${this.position1}-${this.position2}-${this.points1}-${this.points2}`
    }
}

const input = readInput(inputFile);
const cache: Map<string, [number, number]> = new Map();

const solve = () => {
    const initialState: GameState = new GameState(
        parseInt(input[0].slice(-2).trim(), 10),
        parseInt(input[1].slice(-2).trim(), 10),
        0,
        0
    )

    const result = countWins(initialState);
    return Math.max(result[0], result[1]);
}

// There is a limited number of possible game states:
// - 10 positions for player 1
// - 10 position for player 2
// - 21 score options for player 1
// - 21 score options for player 2
// Total: 10 * 10 * 21 * 21 = 44 100
// We can cache these states and use the cached values whenever we can instead of calculating wins for every universe
// 
// Kudos to Reddit members and Jonathan Paulson for providing an awesome explanation.
// I couldn't figure this out without help :)
const countWins = (state: GameState): [number, number] => {
    if (state.points1 >= 21) {
        return [1, 0];
    }
    if (state.points2 >= 21) {
        return [0, 1];
    }

    if (cache.has(state.key())) {
        return cache.get(state.key()) || [0, 0];
    }

    let result: [number, number] = [0, 0];

    for (const throw1 of [1, 2, 3]) {
        for (const throw2 of [1, 2, 3]) {
            for (const throw3 of [1, 2, 3]) {
                const newPlayerPosition1 = calculatePlayerPosition(state.position1, throw1 + throw2 + throw3);
                const newPlayerPoints1 = state.points1 + newPlayerPosition1;

                // Reverse P1 <-> P2 so that we check the other player next
                const newState = new GameState(state.position2, newPlayerPosition1, state.points2, newPlayerPoints1)
                const [wins1, wins2] = countWins(newState);

                result = [result[0] + wins2, result[1] + wins1]
            }
        }
    }

    cache.set(state.key(), result)
    return result;


}

const calculatePlayerPosition = (currentPosition: number, steps: number): number => {
    let newPosition = (currentPosition + steps) % 10;
    if (newPosition === 0)
        return 10;
    return newPosition;
}


export default solve;
