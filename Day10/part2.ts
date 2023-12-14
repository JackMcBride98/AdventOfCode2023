import { readFileSync } from 'fs';
import { isEqual } from 'lodash';

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
let mainLineCoords: Array<[number, number]> = [startCoords];
let verticeCoords: Array<[number, number]> = [startCoords];
verticeCoords.push(currentCoords);

while (true) {
	mainLineCoords.push(currentCoords);
	let { coords, direction } = getNextCoords(currentCoords, currentDirection);
	if (['F', '7', 'J', 'L'].includes(lines[coords[0]][coords[1]])) {
		verticeCoords.push(coords as [number, number]);
	}
	steps++;

	currentCoords = coords as [number, number];
	currentDirection = direction as Direction;

	if (lines[currentCoords[0]][currentCoords[1]] === 'S') {
		lines[currentCoords[0]][currentCoords[1]] = '7';
		break;
	}
}

for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i].length; j++) {
		if (
			lines[i][j] !== '.' &&
			!mainLineCoords.some((mlc) => isEqual(mlc, [i, j]))
		) {
			lines[i][j] = '.';
		}
	}
}

// console.log(mainLineCoords);
console.log(verticeCoords.length);
console.log(steps);

//calcualte area by shoelace algorithm
let area = 0;
let j = verticeCoords.length - 1;
for (let i = 0; i < verticeCoords.length; i++) {
	let nextIndex = (i + 1) % verticeCoords.length;
	const [currentY, currentX] = verticeCoords[i];
	const [nextY, nextX] = verticeCoords[nextIndex];
	area +=
		(verticeCoords[j][1] + verticeCoords[i][1]) *
		(verticeCoords[j][0] - verticeCoords[i][0]);
	j = i;
}

area = Math.ceil(Math.abs(area)) / 2;
console.log(area);
//calculate

let interiorIndices = area - steps / 2 + 1;

console.log(interiorIndices);

//fml made an off by one error when counting the vertices to begin with
