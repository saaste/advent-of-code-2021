import { EdgeVertexGrid } from "./EdgeVertexGrid";
import { Node } from "./Graph";

export const printRoute = (path: Node[], edgeVertexGrid: EdgeVertexGrid) => {
    // Print route
    const pathNames: Set<string> = new Set(path.map((n) => n.name))
        for (let y = 0; y < edgeVertexGrid.getSize(); y++) {
        let row = "";
        for (let x = 0; x < edgeVertexGrid.getSize(); x++) {
            const vertex = edgeVertexGrid.getVertex(x, y);
            if (pathNames.has(vertex.name)) {
                row += `\x1b[35m${vertex.weight}\x1b[0m`;
            } else {
                row += vertex.weight;
            }
        }
        console.log(row);
    }
}