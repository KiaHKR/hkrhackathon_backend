import Constants from './constants';
import * as rules from './rule_checkers';
import * as modifiers from './string_changers';

function generateNiceString(): string {
    let loop_count = 0;

    do {
        if (loop_count > 0) console.log("NICE STRING LOOP!");

        var s = generateRandomString()
        // console.log(s);
        if (rules.isNice(s, Constants.VOWELS, Constants.NUMBERS, Constants.MIN_VOWEL_IN_ROW, Constants.MIN_LENGTH_TO_NOT_NEED_NUMBERS, Constants.MIN_NUMBER_COUNT, Constants.MIN_UNALLOWED_VOWEL_REPEAT)) return s;

        if (!rules.hasThreeVowels(s, Constants.VOWELS, Constants.MIN_VOWEL_IN_ROW)) {
            s = modifiers.addThreeDifferentVowels(s, Constants.VOWELS, Constants.NON_VOWELS, Constants.MIN_VOWEL_IN_ROW);
        }
        // console.log(s);

        if (!rules.doesNotHaveThreeSameVowels(s, Constants.VOWELS, Constants.MIN_UNALLOWED_VOWEL_REPEAT)) {
            let repeated_vowels = modifiers.getRepeatedVowels(s, Constants.VOWELS, Constants.MIN_UNALLOWED_VOWEL_REPEAT);
            s = modifiers.removeSameVowels(s, repeated_vowels, Constants.NON_VOWELS, Constants.MIN_UNALLOWED_VOWEL_REPEAT);
        }
        // console.log(s);
        if (!rules.isLongEnoughOrHasNumbers(s, Constants.NUMBERS, Constants.MIN_LENGTH_TO_NOT_NEED_NUMBERS, Constants.MIN_NUMBER_COUNT)) {
            s = modifiers.addNumberToShortString(s, Constants.NUMBERS);
        }

        // console.log(s);
    } while (!rules.isNice(s, Constants.VOWELS, Constants.NUMBERS, Constants.MIN_VOWEL_IN_ROW, Constants.MIN_LENGTH_TO_NOT_NEED_NUMBERS, Constants.MIN_NUMBER_COUNT, Constants.MIN_UNALLOWED_VOWEL_REPEAT));

    return s;
}

function generateNotNiceString(): string {
    do {
        var s = generateRandomString();
    } while (rules.isNice(s, Constants.VOWELS, Constants.NUMBERS, Constants.MIN_VOWEL_IN_ROW, Constants.MIN_LENGTH_TO_NOT_NEED_NUMBERS, Constants.MIN_NUMBER_COUNT, Constants.MIN_UNALLOWED_VOWEL_REPEAT));

    return s;
}

function generateRandomString(): string {
    const length = getRandomInt(Constants.MIN_STRING_LENGTH, Constants.MAX_STRING_LENGTH + 1);

    let s = '';
    for (let i = 0; i < length; i++) {
        s += Constants.STRING_CHARS[Math.floor(Math.random() * Constants.STRING_CHARS.length)];
    }
    return s;
}


function getRandomInt(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export { generateNiceString, generateNotNiceString }