import { readFileSync } from 'fs';
import { sum } from 'lodash';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

let sequences = contents.map((line) => [
	line.split(' ').map((char) => parseInt(char)),
]);

for (const sequence of sequences) {
	let i = 0;
	let currentSequence = sequence[i];
	while (!currentSequence.every((num) => num === 0)) {
		i++;
		sequence.push(
			currentSequence.slice(1).map((num, index) => num - currentSequence[index])
		);
		currentSequence = sequence[i];
	}

	sequence[sequence.length - 1].unshift(0);
	for (let i = sequence.length - 2; i >= 0; i--) {
		let currentSequence = sequence[i];
		let nextSequence = sequence[i + 1];
		currentSequence.unshift(currentSequence.at(0) - nextSequence.at(0));
	}
}

console.log(sum(sequences.map((sequence) => sequence[0].at(0))));
