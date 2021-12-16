import { PriorityQueue } from "./PriorityQueue";
export class EdgeVertex {
    name: string;
    weight: number;

    constructor(x: number, y: number, weight: number) {
        this.name = `${x},${y}`;
        this.weight = weight;
    }
}

export class EdgeNode {
    name: string;
    weight: number;
    x: number;
    y: number;

    constructor(x: number, y: number, weight: number) {
        this.name = `${x},${y}`;
        this.weight = weight;
        this.x = x;
        this.y = y
    }
}
export class Node {
    name: string;
    weight: number;
    x: number;
    y: number;
    adjacent: EdgeNode[] = [];
    g: number;
    h: number;
    f: number;
    parent: Node | undefined;

    constructor(x: number, y: number, weight: number, adjacent: EdgeNode[]) {
        this.name = `${x},${y}`;
        this.weight = weight;
        this.x = x;
        this.y = y;
        this.adjacent = adjacent;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = undefined;
    }
}

export class Graph {
    private nodes: Map<string, Node>

    constructor() {
        this.nodes = new Map();
    }

    addNode(node: Node) {
        this.nodes.set(node.name, node);
    }

    aStar(start: string, end: string): Node[] {
        // Initialize end node
        const endNode = this.getNodeByName(end);

        // Initialize start node
        const startNode = this.getNodeByName(start);
        this.updateNodeParams(startNode.name, 0, 0);

        // Initialize lists
        const openList: PriorityQueue<Node> = new PriorityQueue();
        const closedList: PriorityQueue<Node> = new PriorityQueue();
        
        // Add start node to the open list
        openList.insert(startNode, startNode.f);

        let currentNode: Node;
        let loop = 0;
        while (openList.size() > 0) {

            // Use sorted list
            const newNode = openList.pop();
            if (!newNode) {
                throw new Error("Unable to pop the node");
            }

            currentNode = newNode;
            closedList.insert(currentNode, currentNode.g);

            // Found the goal
            if (currentNode.name === endNode.name) {
                const path = [];
                let pathNode: Node | undefined = currentNode
                let step = 0;
                while (pathNode !== undefined) {
                    path.push(pathNode);
                    pathNode = pathNode.parent;
                    step++;
                };
                return path;
            }

            const childEdges = currentNode.adjacent.filter((edge) => !closedList.hasName(edge.name));

            for (const childEdge of childEdges) {
                if (openList.hasName(childEdge.name)) {
                    const existingNode = this.getNodeByName(childEdge.name);
                    if (existingNode.g < currentNode.g + childEdge.weight)
                        continue;
                }
                
                let childNode = this.getNodeByName(childEdge.name)
                if (openList.hasName(childEdge.name)) {    
                    if (childNode.g < currentNode.g + childEdge.weight)
                        continue;
                }
                // Calculage h using weight and heuristics
                const g = currentNode.g + childEdge.weight;
                
                // Without H this is basically Dijkstra 
                // const h = this.euclideanDistance(childEdge.name, endNode.name);
                const h = 0;
                
                // Update the child
                this.updateNodeParams(childEdge.name, g, h, currentNode);

                childNode = this.getNodeByName(childEdge.name)

                if (openList.hasName(childNode.name)) {
                    openList.delete(childNode.name);
                }

                openList.insert(childNode, childNode.f);
            }
            
            loop++;
        }
        return [];
    }
    
    private euclideanDistance(start: string, end: string) {
        const startNode = this.getNodeByName(start);
        const endNode = this.getNodeByName(end);
        return Math.sqrt(Math.pow(Math.abs(startNode.x - endNode.x), 2) + Math.pow(Math.abs(startNode.y - endNode.y), 2));
    }

    private manhattanDistance(start: string, end: string) {
        const startNode = this.getNodeByName(start);
        const endNode = this.getNodeByName(end);
        return Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y - endNode.y);
    }

    private getNodeByName(name: string): Node {
        const node = this.nodes.get(name);
        if (node === undefined) {
            throw new Error(`Unable to find a node with ${name}`)
        }
        return node;
    }

    private updateNodeParams(name: string, g: number, h: number, parent?: Node) {
        const node = this.nodes.get(name);
        if (node) {
            node.g = g;
            node.h = h;
            node.f = g + h;
            node.parent = parent;
            this.nodes.set(node.name, node);
        }
    }
}