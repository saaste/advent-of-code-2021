import TinyQueue from "tinyqueue";
import { isFinalState, neighbors } from "./solver";
import { GameState } from "./types";

export const solvePath = (initialState: GameState, step: number): number | null => {
    const pq = new TinyQueue<GameState>([], compF)
    pq.push(initialState);

    const visited: Set<string> = new Set();

    let result: GameState | undefined = undefined;

    const breadcrumb: Map<string, GameState | undefined> = new Map();
    breadcrumb.set(initialState.name, undefined);

    while (pq.length > 0) {
        const gameState = pq.pop() as GameState
        const { name } = gameState;

        if (visited.has(name))
            continue;

        visited.add(name);
        if (isFinalState(gameState)) {
            result = gameState;
            break;
        }

        for (const nextState of neighbors(gameState, step)) {
            if (visited.has(nextState.name))
                continue;

            pq.push(nextState);

            const existingBreadCrumb = breadcrumb.get(nextState.name);
            if (existingBreadCrumb === undefined || existingBreadCrumb.cost > gameState.cost)
                breadcrumb.set(nextState.name, gameState);
        }
    }

    // Print breadcrumbs
    // const sortedBreadCrumbs = [];
    // let currentState: GameState | undefined = result;
    // while (currentState !== undefined) {
    //     sortedBreadCrumbs.push(currentState);
    //     currentState = breadcrumb.get(currentState.name);
    // }

    // sortedBreadCrumbs.reverse();
    // for (const state of sortedBreadCrumbs) {
    //     printGameState(state);
    //     console.log(state.cost)
    // }

    return result?.cost || null;
}

const compF = (a: GameState, b: GameState): number => {
    return a.cost - b.cost;
}
