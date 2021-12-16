import { readInput } from "../helpers/input";
import { VertexGrid } from "./EdgeVertexGrid";
import { Graph, Node } from "./Graph";

const inputFile = `${__dirname}/../../inputs/day-15.txt`;

const solve = () => {
    const input = readInput(inputFile);
    
    // Build the grid
    const vertexGrid = new VertexGrid(input);

    // Build the graph
    const graph = new Graph();
    for (let y = 0; y < vertexGrid.getSize(); y++) {
        for (let x = 0; x < vertexGrid.getSize(); x++) {
            const edgeVertex = vertexGrid.getVertex(x, y);
            const adjacentNodes = vertexGrid.findChildrenNodes(x, y);
            graph.addNode(new Node(x, y, edgeVertex.weight, adjacentNodes))
        }
    }

    const path = graph.aStar("0,0", `${input.length - 1},${input.length - 1}`);
    return path.reduce((p, c) => p + c.weight, 0) - path[path.length - 1].weight;
}

export default solve;
