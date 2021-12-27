import { assert } from "console";
import { GameState, getMovementCost, hallway, PodState } from "./types";

export const neighbors = (state: GameState, step: number): GameState[] => {
    const { cost, podStates } = state;
    assert(podStates.length === (step === 1 ? 8 : 16), "Invalid number of pod states");

    const neighborStates: GameState[] = [];
    const maxDepth = step === 1 ? 2 : 4;

    for (let i = 0; i < podStates.length; i++) {
        const podState = podStates[i];
        const { podType, room, loc, depth } = podState;
        const energyRequired = getMovementCost(podType);
        assert(energyRequired > 0, "Unable to find energy required");

        assert(![2, 4, 6, 8].includes(loc), "Pod is in invalid position");

        // Is the pod already in the right room?
        if (loc === -1) {
            assert(room !== -1, "Invalid room value when pod is in a room");
            if (room === podType) {
                assert(depth > 0, "Invalid depth when is in room")
                if (depth === maxDepth) // Right room and in the last position
                    continue;
                const hasForeignersBehind = podsInRoom(podStates, room, maxDepth).find((p) => p.podType !== room && p.depth > depth) !== undefined;
                if (!hasForeignersBehind)
                    continue;
            }

        }

        // In the room
        if (room != -1) {
            assert(loc === -1, "Invalid loc value when pod is in a room");

            // Check if it possible to move from a deeper position
            if (depth > 1) {
                const isBlocked = podsInRoom(podStates, room, maxDepth).find((p) => p.depth < depth) !== undefined;
                if (isBlocked)
                    continue;
            }



            const destinationRoomState = tryMoveToDestinationRoom(podState, podStates, i, cost, maxDepth)
            if (destinationRoomState) {
                neighborStates.push(destinationRoomState);
            }
            // Try to move to destination room
            const outCost: number = room === -1 ? 0 : depth;
            const currentX: number = Math.max(room, loc);


            // Try to move to all hallway positions:
            for (const destLoc of hallway) {
                if (isRouteBlocked(podStates, currentX, destLoc))
                    continue;

                const costToMove = (outCost + Math.abs(currentX - destLoc)) * energyRequired;

                // Create and push a new state
                const podStatesCopy = [...podStates];
                podStatesCopy.splice(i, 1);
                podStatesCopy.push({ ...podState, loc: destLoc, room: -1, depth: -1 });

                neighborStates.push({
                    podStates: podStatesCopy,
                    cost: cost + costToMove,
                    name: createGameStateName(podStatesCopy)
                });

            }

        } else {
            assert(room === -1, "Invalid room value when pod is not in a room");
            assert(depth === -1, "Invalid depth value when pod is not in a room");
            // Try to move to destination room
            const destinationRoomState = tryMoveToDestinationRoom(podState, podStates, i, cost, maxDepth);
            if (destinationRoomState) {
                neighborStates.push(destinationRoomState);
            }
        }
    }

    return neighborStates;
}

export const isFinalState = (gameState: GameState): boolean => {
    for (const podState of gameState.podStates) {
        if (podState.loc !== -1) {
            assert(podState.room === -1, "Invalid room value when checking final state")
            return false;
        }
        if (podState.room !== podState.podType) {
            assert(podState.loc === -1, "Invalid loc value when checking final state");
            return false;
        }
    }
    return true;
}

export const createGameStateName = (podStates: PodState[]): string => {
    const sortedPodStates = [...podStates];
    sortedPodStates.sort((a, b) => b.id - a.id);
    return sortedPodStates.map((p) => `${p.id}=${Math.max(p.loc, p.room)}.${p.depth}`).join("/");
}

const tryMoveToDestinationRoom = (podState: PodState, podStates: PodState[], podIndex: number, currentCost: number, maxDepth: number): GameState | null => {
    const { podType, room, depth, loc } = podState
    // Try to move to destination room
    const outCost: number = room === -1 ? 0 : depth;
    const destRoom: number = podType; // TODO: Remove if not needed. We can just use pod type
    const currentX: number = Math.max(room, loc);
    const targetRoomPods = podsInRoom(podStates, destRoom, maxDepth)

    // Check if target room has foreigners
    let hasForeigners = targetRoomPods.some((p) => p.podType !== destRoom);
    if (!hasForeigners) {

        // Check if target room is blocked on the way or on the doorway
        const isBlocked = isRouteBlocked(podStates, currentX, destRoom);
        if (!isBlocked) {
            // Good to go! Calculate the cost
            const inCost = maxDepth - targetRoomPods.length;
            const energyRequired = getMovementCost(podType);
            const costToMove = (outCost + (Math.abs(currentX - destRoom) + inCost)) * energyRequired;

            // Create and push a new state
            const podStatesCopy = [...podStates];
            podStatesCopy.splice(podIndex, 1);
            podStatesCopy.push({ ...podState, loc: -1, room: podType, depth: inCost })

            return {
                podStates: podStatesCopy,
                cost: currentCost + costToMove,
                name: createGameStateName(podStatesCopy)
            };
        }
    }

    return null;
}

const podsInRoom = (podStates: PodState[], room: number, maxDepth: number): PodState[] => {
    const pods: PodState[] = [];
    for (const podState of podStates) {
        if (podState.room === room)
            pods.push(podState);

        if (pods.length === maxDepth)
            break;
    }
    for (const pod of pods) {
        assert(pod.room === room, "Invalid room in podsInRoom");
    }

    return pods;
}

const isRouteBlocked = (podStates: PodState[], from: number, to: number): boolean => {
    for (const podState of podStates) {
        if (podState.loc === to)
            return true;
        else if (podState.loc > Math.min(from, to) && podState.loc < Math.max(from, to))
            return true;
    }
    return false;
}
