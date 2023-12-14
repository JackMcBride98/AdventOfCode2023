import { readFileSync } from 'fs';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');
let lines = contents.map((line) => line.split(''));

let startCoords: [number, number] = [0, 0];

for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i].length; j++) {
		if (lines[i][j] === 'S') {
			startCoords = [i, j];
		}
	}
}

type Direction = 'up' | 'down' | 'left' | 'right';

const getNextCoords = (coords: [number, number], direction: Direction) => {
	let symbol = lines[coords[0]][coords[1]];
	console.log(symbol);
	switch (symbol) {
		case '|':
			if (direction === 'down') {
				return { coords: [coords[0] + 1, coords[1]], direction: 'down' };
			}
			if (direction === 'up') {
				return { coords: [coords[0] - 1, coords[1]], direction: 'up' };
			}
			throw new Error('Invalid direction');
		case '-':
			if (direction === 'left') {
				return { coords: [coords[0], coords[1] - 1], direction: 'left' };
			}
			if (direction === 'right') {
				return { coords: [coords[0], coords[1] + 1], direction: 'right' };
			}
			throw new Error('Invalid direction');
		case 'L':
			if (direction === 'down') {
				return { coords: [coords[0], coords[1] + 1], direction: 'right' };
			}
			if (direction === 'left') {
				return { coords: [coords[0] - 1, coords[1]], direction: 'up' };
			}
			throw new Error('Invalid direction');
		case '7':
			if (direction === 'right') {
				return { coords: [coords[0] + 1, coords[1]], direction: 'down' };
			}
			if (direction === 'up') {
				return { coords: [coords[0], coords[1] - 1], direction: 'left' };
			}
			throw new Error('Invalid direction');
		case 'J':
			if (direction === 'right') {
				return { coords: [coords[0] - 1, coords[1]], direction: 'up' };
			}
			if (direction === 'down') {
				return { coords: [coords[0], coords[1] - 1], direction: 'left' };
			}
			throw new Error('Invalid direction');
		case 'F':
			if (direction === 'left') {
				return { coords: [coords[0] + 1, coords[1]], direction: 'down' };
			}
			if (direction === 'up') {
				return { coords: [coords[0], coords[1] + 1], direction: 'right' };
			}
			throw new Error('Invalid direction');
	}
};

let steps = 1;
console.log(startCoords);
let currentCoords = [startCoords[0] + 1, startCoords[1]] as [number, number];
let currentDirection: 'up' | 'down' | 'left' | 'right' = 'down';

while (true) {
	let { coords, direction } = getNextCoords(currentCoords, currentDirection);
	steps++;

	currentCoords = coords as [number, number];
	currentDirection = direction as Direction;

	if (lines[currentCoords[0]][currentCoords[1]] === 'S') {
		break;
	}
}

console.log(steps);
