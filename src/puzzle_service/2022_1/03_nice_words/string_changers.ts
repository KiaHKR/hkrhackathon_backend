import { charIsVowel } from './rule_checkers';

function addThreeDifferentVowels(s: string, vowels: string[], non_vowels: string[], min_vowels_in_row: number): string {
    let vowel_string = '';
    let available_vowels = [...vowels];
    vowel_string += non_vowels[Math.floor(Math.random() * non_vowels.length)];
    for (let i = 0; i < min_vowels_in_row; i++) {
        let chosen_vowel = available_vowels[Math.floor(Math.random() * available_vowels.length)];
        vowel_string += chosen_vowel;
        available_vowels = available_vowels.filter(val => val != chosen_vowel);
    }
    vowel_string += non_vowels[Math.floor(Math.random() * non_vowels.length)];

    const start_replace_i = Math.floor(Math.random() * (s.length - min_vowels_in_row - 3));

    return s.substring(0, start_replace_i) + vowel_string + s.substring(start_replace_i + min_vowels_in_row + 2);
}

function addNumberToShortString(s: string, numbers: string[]): string {
    let string_arr = s.split('');

    // do {
    //     var first_rand_num_index = Math.floor(Math.random() * s.length);
    //     var second_rand_num_index = 0;

    //     second_rand_num_index = Math.floor(Math.random() * s.length);
    // } while (first_rand_num_index == second_rand_num_index || charIsVowel(string_arr[first_rand_num_index]) || charIsVowel(string_arr[second_rand_num_index]));

    string_arr[0] = numbers[Math.floor(Math.random() * numbers.length)];
    string_arr[string_arr.length - 1] = numbers[Math.floor(Math.random() * numbers.length)];

    return string_arr.join('');
}

function removeSameVowels(s: string, vowels: string[], min_unallowed_vowel_repeat: number): string {
    const repeated_vowels = vowels.map(value => value.repeat(min_unallowed_vowel_repeat));

    // Each item has char, start, and end indexes
    do {
        for (const repeat of repeated_vowels) {
            s = s.replace(repeat, "ffc");
        }
    } while (repeated_vowels.some(str => s.includes(str)));

    return s;
}

function getRepeatedVowels(s: string, vowels: string[], min_unallowed_vowel_repeat: number) {
    // Map the vowel constants into a map of counters
    let vowel_counters = new Map(vowels.map(e => [e, 0]));
    let illegal_strings: { char: string, start: number, end: number }[] = [];
    for (const { char, index } of s.split('').map((char, index) => ({ char, index }))) {
        if (charIsVowel(char, vowels)) {
            vowel_counters[char]++;
        } else {
            Object.entries(vowel_counters).filter(([_, value]) => value >= min_unallowed_vowel_repeat).forEach(([key, value]) => {
                illegal_strings.push({ char: key, start: index - value, end: value });
            });

            Object.keys(vowel_counters).forEach(key => vowel_counters[key] = 0);
        }
    }

    return illegal_strings;
}

export { addThreeDifferentVowels, addNumberToShortString, removeSameVowels, getRepeatedVowels };