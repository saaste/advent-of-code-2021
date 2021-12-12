import { DuplicateFinder } from "./DuplicateFinder";
import { Node } from "./Node";

export class RouteFinder {
    private nodes: Map<string, Node>;
    private allowOneSmallTwice: boolean;
    private debug: boolean;

    constructor(nodes: Map<string, Node>, allowOneSmallTwice: boolean, debug: boolean = false) {
        this.nodes = nodes;
        this.allowOneSmallTwice = allowOneSmallTwice;
        this.debug = debug;
    }

    findRoutes(currentNodeName: string = "start", currentRoute: string[] = ["start"], foundRoutes: string[] = [], duplicateFinder: DuplicateFinder = new DuplicateFinder()): string[] {
        this.log(`Current node: ${currentNodeName}`)
        const currentNode = this.getNode(currentNodeName);

        if (currentNode.isEnd) {
            const foundRoute = [...currentRoute].join(",")
            this.log(`FOUND A ROUTE: ${foundRoute}`)
            return [...foundRoutes, foundRoute]
        }

        for (const neighbour of currentNode.neighbours) {
            const neighbourNode = this.getNode(neighbour);
            if (this.canVisit(neighbourNode, duplicateFinder)) {
                duplicateFinder.addNode(neighbourNode);
                foundRoutes = this.findRoutes(neighbourNode.name, [...currentRoute, neighbour], foundRoutes, duplicateFinder)
                duplicateFinder.removeNode(neighbourNode);
            }
        }

        return foundRoutes;
    }

    private canVisit(node: Node, duplicateFinder: DuplicateFinder): boolean {
        if (node.isStart) return false;
        if (node.isEnd) true;

        if (!this.allowOneSmallTwice) {
            return node.isBig || !duplicateFinder.isVisited(node.name);
        } else {
            if (node.isBig || !duplicateFinder.isVisited(node.name) || !duplicateFinder.hasDuplicates()) return true;
            return false;
        }
    }

    private getNode(nodeName: string): Node {
        const node = this.nodes.get(nodeName);
        if (!node) {
            throw new Error("NODE NOT FOUND");
        }
        return node;
    }

    private log(message: string): void {
        if (this.debug) console.log(message)
    }
}


