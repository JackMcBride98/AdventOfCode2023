import { readFileSync } from 'fs';
import { sum } from 'lodash';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

type ScratchCard = {
	winningNumbers: number[];
	numbers: number[];
	cardNumber: number;
	count: number;
};

let scratchcards: ScratchCard[] = [];

contents.forEach((line, index) => {
	let [winningNumbers, numbers] = line
		.split(':')[1]
		.split('|')
		.map((nums) =>
			nums
				.split(' ')
				.map((n) => parseInt(n))
				.filter((n) => !isNaN(n))
		);
	scratchcards.push({
		winningNumbers,
		numbers,
		cardNumber: index + 1,
		count: 1,
	});
});

// part 1

let pointsSum = 0;

scratchcards.forEach((scratchcard) => {
	let points = 0;
	for (const num of scratchcard.numbers) {
		if (scratchcard.winningNumbers.includes(num)) {
			if (points === 0) {
				points += 1;
			} else {
				points *= 2;
			}
		}
	}
	pointsSum += points;
	console.log(points);
});

console.log(pointsSum);

// part 2

scratchcards.forEach((scratchcard) => {
	for (let i = 0; i < scratchcard.count; i++) {
		let matches = [];
		let matchIndex = scratchcard.cardNumber;
		for (const num of scratchcard.numbers) {
			if (scratchcard.winningNumbers.includes(num)) {
				matches.push(matchIndex + 1);
				matchIndex++;
			}
		}
		for (const m of matches) {
			scratchcards.find((s) => s.cardNumber == m).count++;
		}
	}
});

console.log(sum(scratchcards.map((s) => s.count)));
