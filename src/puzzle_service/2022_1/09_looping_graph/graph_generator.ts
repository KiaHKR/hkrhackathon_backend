import Randoms from "../utilities/randoms";

export default class GraphGenerator {
    symbolsToUse: string[];
    minNumberOfNodes = 15;

    nodes!: Set<string>;
    nodesToConnectTo!: Set<string>;
    connections: Map<string, Set<string>> | undefined;

    random = new Randoms();


    constructor(symbolsToUse: string[]) {
        this.symbolsToUse = symbolsToUse;
    }

    generateGraphWithoutCycles(): Map<string, Set<string>>{
        this.nodes = this.generateRandomSetOfNodes();
        this.nodesToConnectTo = new Set();
        this.connections = new Map<string, Set<string>>();

        this.nodes.forEach(item => {
            this.connections?.set(item, new Set<string>());
        })

        while (!this.nodesIsEmpty()) {
            this.createNode();
        }
        return this.connections;
    }

    private createNode() {
        const node = this.getAndRemoveRandomNodeFrom(this.nodes);
        if (!node)
            return;

        while (this.isGettingNeighbour())
            this.createNeighbour(node);

        this.createConnection(node);
        this.nodesToConnectTo.add(node);
    }

    private generateRandomSetOfNodes(): Set<string> {
        const numberOfNodes = this.random.randomInt(this.minNumberOfNodes, this.symbolsToUse.length - 1);

        const shuffled = [...this.symbolsToUse].sort(() => 0.5 - Math.random());

        return new Set<string>(shuffled.slice(0, numberOfNodes));
    }

    private createConnection(from: string) {
        const alreadyConnectedTo = new Set<string>();

        do {
            const to = this.getRandomNodeFrom(this.nodesToConnectTo);

            if (to == null || alreadyConnectedTo.has(to))
                return;

            this.makeConnection(from, to);
            alreadyConnectedTo.add(to);
        }
        while (this.isGettingAnotherConnection());
    }

    private getAndRemoveRandomNodeFrom(set: Set<string>) {
        const item = this.getRandomNodeFrom(set);
        if (item == null)
            return;

        set.delete(item);
        return item;
    }

    private getRandomNodeFrom(set: Set<string>): string | null {
        if (set.size == 0)
            return null;

        const items = Array.from(set);
        return items[Math.floor(Math.random() * items.length)];
    }

    private nodesIsEmpty() {
        return this.nodes?.size == 0;
    }

    private createNeighbour(from: string) {
        const to = this.getAndRemoveRandomNodeFrom(this.nodes);
        if (to == null)
            return;

        this.makeConnection(from, to);
    }

    private makeConnection(from: string, to: string) {
        this.connections?.get(from)?.add(to);
    }

    private isGettingAnotherConnection() {
        return this.coinFlip();
    }

    private isGettingNeighbour() {
        return this.nodesIsEmpty() && this.coinFlip();
    }

    private coinFlip() {
        return this.random.coinFlip();
    }
}
