export enum PodType {
    A = 2,
    B = 4,
    C = 6,
    D = 8
};

export interface PodState {
    id: number;
    podName: string;
    podType: PodType,
    loc: number;
    room: number;
    depth: number;
};

export interface GameState {
    podStates: PodState[];
    cost: number;
    name: string;
};

export const getMovementCost = (podType: PodType): number => {
    const result = movementCosts.get(podType)
    if (!result)
        throw new Error(`Invalid pod type: ${podType}`)

    return result;
}

export const hallway = [0, 1, 3, 5, 7, 9, 10];

const movementCosts: Map<PodType, number> = new Map([
    [PodType.A, 1],
    [PodType.B, 10],
    [PodType.C, 100],
    [PodType.D, 1000]
]);
