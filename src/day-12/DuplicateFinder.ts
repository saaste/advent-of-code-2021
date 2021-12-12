import { Node } from "./Node";

export class DuplicateFinder {
    private nodes: Map<string, number>;
    private duplicate: string | undefined;

    constructor() {
        this.nodes = new Map();
        this.duplicate = undefined;
    }

    addNode(node: Node) {
        if (node.isBig || node.isStart || node.isEnd) {
            return;
        }

        const existingCount = this.nodes.get(node.name) || 0;
        if (existingCount > 0) {
            this.duplicate = node.name;
        }
        this.nodes.set(node.name, existingCount + 1)
    }

    removeNode(node: Node) {
        if (node.isBig || node.isStart || node.isEnd) {
            return;
        }

        const existingCount = this.nodes.get(node.name) || 0;
        if (existingCount === 0) {
            return;
        }

        this.nodes.set(node.name, existingCount - 1)
        if (this.duplicate === node.name) {
            this.duplicate = undefined;
        }
    }

    hasDuplicates(): boolean {
        return this.duplicate !== undefined;
    }

    isVisited(nodeName: string): boolean {
        return (this.nodes.get(nodeName) || 0) > 0;
    }
}
