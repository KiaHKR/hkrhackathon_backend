export default class Randoms{
    public coinFlip() {
        return (Math.floor(Math.random() * 2) == 0);
    }

    /*
    Max value is not included.
     */
    public randomInt(min: number, max: number) { // max excluded
        return Math.floor(Math.random() * (max - min) + min);
    }

    public randomChar(alphabet: string) {
        return alphabet[Math.floor(Math.random() * alphabet.length)]
    }
}
