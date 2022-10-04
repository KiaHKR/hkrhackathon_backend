export default class Constants {
    static NUMBER_OF_STRINGS = 2000;
    static MIN_STRING_LENGTH = 5;
    static MAX_STRING_LENGTH = 15;
    static STRING_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    static VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
    static NON_VOWELS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q','r', 's', 't', 'v', 'w', 'x', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    static CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    static NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Rule constants
    static MIN_LENGTH_TO_NOT_NEED_NUMBERS = 8;
    static MIN_NUMBER_COUNT = 2;
    static MIN_VOWEL_IN_ROW = 3;
    static MIN_UNALLOWED_VOWEL_REPEAT = 3;
}
