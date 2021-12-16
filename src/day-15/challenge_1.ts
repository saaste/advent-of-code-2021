import { readInput } from "../helpers/input";
import { EdgeVertexGrid } from "./EdgeVertexGrid";
import { Graph, Vertex } from "./Graph";

const inputFile = `${__dirname}/../../inputs/day-15.txt`;

const solve = () => {
    const input = readInput(inputFile);
    
    // Build the grid
    const edgeVertexGrid = new EdgeVertexGrid(input);

    // Build the graph
    const graph = new Graph();
    for (let y = 0; y < edgeVertexGrid.getSize(); y++) {
        for (let x = 0; x < edgeVertexGrid.getSize(); x++) {
            const edgeVertex = edgeVertexGrid.getVertex(x, y);
            const adjacent = edgeVertexGrid.findChildren(x, y);
            graph.addVertex(new Vertex(x, y, edgeVertex.weight, adjacent));
        }
    }

    graph.dijkstra();
    
    const shortestPath = graph.getShortestPath("0,0", `${input.length - 1},${input.length - 1}`);
    const score = shortestPath.reduceRight((p, c) => p + c.weight, 0) - edgeVertexGrid.getVertex(0,0).weight;
    return score;
}

export default solve;
