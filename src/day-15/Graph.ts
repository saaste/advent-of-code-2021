import { EdgeVertexGrid } from "./EdgeVertexGrid";

export class EdgeVertex {
    name: string;
    weight: number;

    constructor(x: number, y: number, weight: number) {
        this.name = `${x},${y}`;
        this.weight = weight;
    }
}

export class Vertex {
    name: string;
    weight: number;
    adjacent: EdgeVertex[] = [];
    distance: number;

    constructor(x: number, y: number, weight: number, adjacent: EdgeVertex[]) {
        this.name = `${x},${y}`;
        this.weight = weight;
        this.adjacent = adjacent;
        this.distance = Infinity;
    }
}

export class Graph {
    private vertices: Map<string, Vertex>;

    constructor() {
        this.vertices = new Map();
    }

    addVertex(vertex: Vertex) {
        this.vertices.set(vertex.name, vertex);
    }

    dijkstra() {
        const sptSet: Set<string> = new Set();
        
        // Initialize start node
        let currentVertex = this.getVertexByName('0,0');
        this.updateDistance(currentVertex.name, 0);

        // Add start node to shortest path tree
        sptSet.add(currentVertex.name);

        // Update adjacent distances
        let adjacent = currentVertex.adjacent.filter((edge) => !sptSet.has(edge.name));
        for (const edge of adjacent) {
            this.updateDistance(edge.name, currentVertex.distance + edge.weight);
        }
        
        while(sptSet.size < this.vertices.size) {
            // Pick minimum distance vertex
            currentVertex = this.getMinDistanceVertex(sptSet);
            sptSet.add(currentVertex.name)
            adjacent = currentVertex.adjacent.filter((edge) => !sptSet.has(edge.name));
            for (const edge of adjacent) {
                this.updateDistance(edge.name, currentVertex.distance + edge.weight);
            }
        }

        // Pick minimum distance vertex
        currentVertex = this.getMinDistanceVertex(sptSet);
        sptSet.add(currentVertex.name)
        adjacent = currentVertex.adjacent.filter((edge) => !sptSet.has(edge.name));
        for (const edge of adjacent) {
            this.updateDistance(edge.name, currentVertex.distance + edge.weight);
        }

        
    }

    getShortestPath(start: string, end: string): Vertex[] {
        let currentVertex = this.getVertexByName(end);
        const path: Vertex[] = [currentVertex];

        let adjacent: Vertex[] = [];

        while(currentVertex.name !== start) {
            adjacent = [];
            this.vertices.forEach((vertex, name) => {
                if (!path.map((v) => v.name).includes(name) && vertex.adjacent.map((edge) => edge.name).includes(currentVertex.name)) {
                    adjacent.push(vertex);
                }
            })
            adjacent.sort(this.sortChild).reverse();
            currentVertex = adjacent[0];
            path.push(currentVertex);
        }

        path.reverse();
        return path;
    }

    private sortChild(a: Vertex, b: Vertex): number {
        if (a.distance === b.distance) {
            return b.weight - a.weight;
        }
        return b.distance - a.distance;
    }

    private getVertexByName(name: string): Vertex {
        const vertex = this.vertices.get(name);
        if (vertex === undefined) {
            throw new Error(`Unable to find a vertex with ${name}`)
        }
        return vertex;
    }

    private updateDistance(name: string, distance: number) {
        const vertex = this.vertices.get(name);
        if (vertex && distance < vertex.distance) {
            vertex.distance = distance;
            this.vertices.set(vertex.name, vertex);
        }
    }

    private getMinDistanceVertex(usedVertices: Set<string>): Vertex {
        let closestVertex = new Vertex(-1, -1, 0, []);
        for (const vertex of this.vertices.values()) {
            if (!usedVertices.has(vertex.name) && vertex.distance <= closestVertex.distance) {
                if (vertex.distance === closestVertex.distance) {
                    closestVertex = vertex
                } else {
                    closestVertex = vertex;
                }
            }
        }
        return closestVertex;
    }
}