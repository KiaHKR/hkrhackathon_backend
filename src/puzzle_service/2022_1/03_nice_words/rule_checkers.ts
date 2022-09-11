function isNice(s: string, vowels: string[], numbers: string[], min_vowel_in_row: number, min_length_to_not_need_numbers: number, min_number_count: number, min_unallowed_vowel_repeat: number): boolean {
    return hasThreeVowels(s, vowels, min_vowel_in_row) && doesNotHaveThreeSameVowels(s, vowels, min_unallowed_vowel_repeat) && isLongEnoughOrHasNumbers(s, numbers, min_length_to_not_need_numbers, min_number_count);
}

function hasThreeVowels(s: string, vowels: string[], min_vowel_in_row: number): boolean {
    let vowel_count = 0;
    for (const char of s) {
        if (charIsVowel(char, vowels)) {
            vowel_count++;
        } else {
            vowel_count = 0;
        }

        if (vowel_count == min_vowel_in_row) {
            return true;
        }
    }

    // console.log("HAS THREE VOWELS IS FALSE");
    return false;
}

function charIsVowel(char: string, vowels: string[]): boolean {
    return vowels.includes(char);
}

function isLongEnoughOrHasNumbers(s: string, numbers: string[], min_length_to_not_need_numbers: number, min_number_count: number): boolean {
    if (s.length >= min_length_to_not_need_numbers) return true;

    let number_count = 0;
    for (const char of s) {
        if (charIsNumber(char, numbers)) {
            number_count++;
        }
    }

    // console.log("IS LONG ENOUGH IS FALSE");
    // console.log(`HAS TWO NUMBERS IS ${number_count >= MIN_NUMBER_COUNT}`)
    return number_count >= min_number_count;
}

function charIsNumber(char: string, numbers: string[]): boolean {
    return numbers.includes(char);
}

function doesNotHaveThreeSameVowels(s: string, vowels: string[], min_unallowed_vowel_repeat: number): boolean {
    // Map the vowel constants into a map of counters
    let vowel_counters = new Map(vowels.map(e => [e, 0]));
    for (const char of s) {
        if (charIsVowel(char, vowels)) {
            vowel_counters[char]++;
        } else {
            Object.keys(vowel_counters).forEach(key => vowel_counters[key] = 0);
        }

        if (vowel_counters[char] == min_unallowed_vowel_repeat) {
            return false;
        }
    }
    // console.log("DOES NOT HAVE THREE SAME VOWELS IS FALSE");
    return true;
}

export { isNice, hasThreeVowels, charIsVowel, isLongEnoughOrHasNumbers, charIsNumber, doesNotHaveThreeSameVowels };