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

let sum = contents
	.map((line) => line.split('').filter((char) => isDigit(char)))
	.map((list) => list[0] + list.at(-1))
	.reduce(
		(accumulator, currentValue) => accumulator + parseInt(currentValue),
		0
	);

console.log(sum);
