import { readFileSync } from 'fs';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

let lines = contents.map((line) => line.split(''));

let emptyRowIndexes = lines
	.map((line, index) => {
		if (line.every((char) => char === '.')) {
			return index;
		}
		return -1;
	})
	.filter((index) => index !== -1);

console.log(emptyRowIndexes);

let emptyColIndexes = [];

for (let i = 0; i < lines[0].length; i++) {
	let empty = true;
	for (let j = 0; j < lines.length; j++) {
		if (lines[j][i] !== '.') {
			empty = false;
			break;
		}
	}
	if (empty) {
		emptyColIndexes.push(i);
	}
}

console.log(emptyColIndexes);

// find all galaxies
let galaxies = [];
for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i].length; j++) {
		if (lines[i][j] === '#') {
			galaxies.push([j, i]);
			lines[i][j] = galaxies.length.toString();
		}
		continue;
	}
}
let shortestSumTotal = 0;
const expansion_multiplier = 1_000_000;
// calulate sum of shortest paths between all pairs of points
for (let i = 0; i < galaxies.length; i++) {
	for (let j = i; j < galaxies.length; j++) {
		if (i === j) {
			continue;
		}

		let emptyRowsCrossed = 0;
		let emptyColsCrossed = 0;

		// check if there are empty rows between the two points
		let rowStart = Math.min(galaxies[i][1], galaxies[j][1]);
		let rowEnd = Math.max(galaxies[i][1], galaxies[j][1]);

		let colStart = Math.min(galaxies[i][0], galaxies[j][0]);
		let colEnd = Math.max(galaxies[i][0], galaxies[j][0]);

		for (const emptyRowIndex of emptyRowIndexes) {
			if (emptyRowIndex > rowStart && emptyRowIndex < rowEnd) {
				emptyRowsCrossed++;
			}
		}

		for (const emptyColIndex of emptyColIndexes) {
			if (emptyColIndex > colStart && emptyColIndex < colEnd) {
				emptyColsCrossed++;
			}
		}

		let shortestSum =
			Math.abs(galaxies[i][0] - galaxies[j][0]) +
			Math.abs(galaxies[i][1] - galaxies[j][1]) +
			(emptyRowsCrossed + emptyColsCrossed) * (expansion_multiplier - 1);

		console.log(
			[i, j],
			shortestSum,
			`rows crossed: ${emptyRowsCrossed} cols crossed: ${emptyColsCrossed}`
		);

		shortestSumTotal += shortestSum;
	}
}

console.log(shortestSumTotal);

console.log(lines.map((line) => line.join('')).join('\n'));
