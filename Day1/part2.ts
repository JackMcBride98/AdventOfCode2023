import { readFileSync } from 'fs';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

const isDigit = (char: string) =>
	char === '0' ||
	char === '1' ||
	char === '2' ||
	char === '3' ||
	char === '4' ||
	char === '5' ||
	char === '6' ||
	char === '7' ||
	char === '8' ||
	char === '9';

const replaceNumberWordsWithDigits = (string: string): string =>
	string
		.replaceAll('one', 'one1one')
		.replaceAll('two', 'two2two')
		.replaceAll('three', 'three3three')
		.replaceAll('four', 'four4four')
		.replaceAll('five', 'five5five')
		.replaceAll('six', 'six6six')
		.replaceAll('seven', 'seven7seven')
		.replaceAll('eight', 'eight8eight')
		.replaceAll('nine', 'nine9nine');

let sum = contents
	.map((line) =>
		replaceNumberWordsWithDigits(line)
			.split('')
			.filter((char) => isDigit(char))
	)
	.map((list) => list[0] + list.at(-1))
	.reduce(
		(accumulator, currentValue) => accumulator + parseInt(currentValue),
		0
	);

console.log(sum);
console.log(replaceNumberWordsWithDigits('4nineeightseven2'));
