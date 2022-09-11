export default class GraphUtils {

    public createCycle(map: Map<string, Set<string>>) {
        const keys = map.keys();
        const nodes = this.getMultipleRandom(keys, 3);

        map.get(nodes[0])?.add(nodes[1]);
        map.get(nodes[1])?.add(nodes[2]);
        map.get(nodes[2])?.add(nodes[0]);
    }

    private getMultipleRandom(keys: IterableIterator<string>, numberOfNodes: number) {
        const shuffled = Array.from(keys);
        [...shuffled].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numberOfNodes);
    }
}
