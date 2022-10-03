enum Command {
    ROTATE,
    SWAP,
    EXCHANGE,
    SHIFT,
    MIRROR
}

function getRandomCommand<Command>(): Command[keyof Command] {
    const enumValues = Object.keys(Command)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as Command[keyof Command][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}



export { Command, getRandomCommand }