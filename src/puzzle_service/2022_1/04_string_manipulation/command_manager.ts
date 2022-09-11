enum Command {
    ROTATE,
    SWAP,
    EXCHANGE,
    SHIFT,
    MIRROR
}

function getRandomCommand(): Command {
    let randomIndex = Math.floor(Math.random() * Object.keys(Command).length);
    let randomEnumValue = Object.values(Command)[randomIndex];

    return Command[randomEnumValue];
}



export { Command, getRandomCommand }