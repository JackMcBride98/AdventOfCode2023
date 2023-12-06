import { readFileSync } from 'fs';
import { sum, isNumber, multiply } from 'lodash';

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

const isSymbol = (char: string) => !isDigit(char) && char !== '.';

const convertArrayOfNumbersToArrayOfArraysOfConsecutiveNumbers = (
	arr: number[]
): number[][] => {
	let result = [];
	for (var i = 0; i < arr.length; i++) {
		if (i === 0) {
			result.push([arr[0]]);
		} else if (arr[i] != arr[i - 1] + 1) {
			result.push([arr[i]]);
		} else {
			let tmp = result[result.length - 1];
			tmp.push(arr[i]);
			result[result.length - 1] = tmp;
		}
	}
	return result;
};

let numberIndexesForLines = [];
const gridLength = contents[0].length;
const gridHeight = contents.length;

for (const line of contents) {
	let numberIndexes = line
		.split('')
		.map((c, i) => (isDigit(c) ? i : -1))
		.filter((s) => isNumber(s) && s >= 0);

	numberIndexesForLines.push(
		convertArrayOfNumbersToArrayOfArraysOfConsecutiveNumbers(numberIndexes)
	);
}

let partNumbers = [];

for (const [index, line] of numberIndexesForLines.entries()) {
	partNumbers.push([]);
	for (const numberIndexes of line) {
		let isPartNumber = false;
		for (const number of numberIndexes) {
			//check previous row
			if (
				isSymbol(contents[Math.max(0, index - 1)][Math.max(0, number - 1)]) ||
				isSymbol(contents[Math.max(0, index - 1)][number]) ||
				isSymbol(
					contents[Math.max(0, index - 1)][Math.min(gridLength - 1, number + 1)]
				)
			) {
				isPartNumber = true;
				break;
			}
			//check current row
			if (
				isSymbol(contents[index][Math.max(0, number - 1)]) ||
				isSymbol(contents[index][Math.min(gridLength - 1, number + 1)])
			) {
				isPartNumber = true;
				break;
			}
			//check row below
			if (
				isSymbol(
					contents[Math.min(gridHeight - 1, index + 1)][Math.max(0, number - 1)]
				) ||
				isSymbol(contents[Math.min(gridHeight - 1, index + 1)][number]) ||
				isSymbol(
					contents[Math.min(gridHeight - 1, index + 1)][
						Math.min(gridLength - 1, number + 1)
					]
				)
			) {
				isPartNumber = true;
				break;
			}
		}
		if (isPartNumber) {
			partNumbers[index].push(numberIndexes);
		}
	}
}

const numbers = [];

for (const [i, arr] of partNumbers.entries()) {
	for (const num of arr) {
		numbers.push(num.map((n) => contents[i][n]).join(''));
	}
}

const sum2 = sum(numbers.map((num) => parseInt(num)));

console.log(sum2);

let gearRatioSum = 0;

for (const [index, line] of contents.entries()) {
	if (line.includes('*')) {
		let starIndices = [];
		for (let i = 0; i < line.length; i++) {
			if (line[i] === '*') {
				starIndices.push(i);
			}
		}
		for (const starIndex of starIndices) {
			let starPartNumbers = [];
			if (index > 0) {
				//check previous row
				for (const number of numberIndexesForLines[index - 1]) {
					if (
						number.includes(starIndex) ||
						number.includes(starIndex - 1) ||
						number.includes(starIndex + 1)
					) {
						starPartNumbers.push(
							number.map((n) => contents[index - 1][n]).join('')
						);
					}
				}
			}
			//check middle row
			for (const number of numberIndexesForLines[index]) {
				if (
					number.includes(starIndex) ||
					number.includes(starIndex - 1) ||
					number.includes(starIndex + 1)
				) {
					starPartNumbers.push(number.map((n) => contents[index][n]).join(''));
				}
			}
			//check row below
			if (index < gridHeight - 1) {
				for (const number of numberIndexesForLines[index + 1]) {
					if (
						number.includes(starIndex) ||
						number.includes(starIndex - 1) ||
						number.includes(starIndex + 1)
					) {
						starPartNumbers.push(
							number.map((n) => contents[index + 1][n]).join('')
						);
					}
				}
			}
			if (starPartNumbers.length === 2) {
				console.log(starPartNumbers);
				console.log(starPartNumbers.map((spn) => parseInt(spn)));
				gearRatioSum += starPartNumbers
					.map((spn) => parseInt(spn))
					.reduce((a, b) => a * b, 1);
			}
		}
	}
}

console.log(gearRatioSum);
