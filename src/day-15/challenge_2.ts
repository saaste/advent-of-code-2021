import { readInput } from "../helpers/input";
import { EdgeVertexGrid } from "./EdgeVertexGrid";
import { Graph, Vertex } from "./Graph";

const inputFile = `${__dirname}/../../inputs/day-15.txt`;

const solve = () => {
    const originalInput = readInput(inputFile);
    let input: string[] = [];

    // Repeat to right
    for (let rowI = 0; rowI < originalInput.length; rowI++) {
        input[rowI] = "";

        for (let inc = 0; inc < 5; inc++) {
            const numbers = [...originalInput[rowI]].map((n) => {
                const number = parseInt(n, 10);
                if ((number + inc) % 9 === 0) {
                    return 9;
                }
                return (number + inc) % 9;
            })

            input[rowI] += numbers.join("");
        }
    }

    // Repeat to down
    const originalWideInput = [...input];
    for (let inc = 1; inc < 5; inc++) {
        for (const row of originalWideInput) {
            const numbers = [...row].map((n) => {
                const number = parseInt(n, 10);
                if ((number + inc) % 9 === 0) {
                    return "9";
                }
                return ((number + inc) % 9).toString();
            }).join("")
            input.push(numbers)
        }
    }

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
