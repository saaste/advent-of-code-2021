import { readInput } from "../helpers/input";
import { VertexGrid } from "./EdgeVertexGrid";
import { Graph, Node } from "./Graph";

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
