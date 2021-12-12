import { readInput } from "../helpers/input";
import { Node } from "./Node";
import { RouteFinder } from "./RouteFinder";

const inputFile = `${__dirname}/../../inputs/day-12.txt`;

const solve = () => {
    const nodes: Map<string, Node> = new Map();
    const input = readInput(inputFile);

    // Build a node tree
    for (const row of input) {
        if (row !== "") {
            const [nameA, nameB] = row.split("-");
            if (!nodes.has(nameA)) nodes.set(nameA, new Node(nameA))
            if (!nodes.has(nameB)) nodes.set(nameB, new Node(nameB));

            nodes.get(nameA)?.addNeighbour(nameB)
            nodes.get(nameB)?.addNeighbour(nameA)
        }
    }

    const routeFinder = new RouteFinder(nodes, false, false);
    const routes = routeFinder.findRoutes();
    return routes.length;
}

export default solve;
