import { readFileSync } from 'fs';
import { isEqual, min, slice } from 'lodash';

let contents = readFileSync('example.txt', 'utf8').split('\r\n');

let maps: string[][] = [];

let chunk: string[] = [];
for (let i = 0; i < contents.length; i++) {
	if (contents[i] === '') {
		maps.push(chunk);
		chunk = [];
	} else {
		chunk.push(contents[i]);
	}
}
maps.push(chunk);

const isLineReflectedAtIndex = (line: string[], index: number): boolean => {
	let linesToleft = index + 1;
	let linesToRight = line.length - index - 1;
	console.log('linesToleft', linesToleft);
	console.log('linesToRight', linesToRight);
	let sliceLength = Math.min(linesToleft, linesToRight);

	console.log('line', line);
	console.log('index', index);
	console.log('sliceLength', sliceLength);
	let left = line.slice(index - sliceLength + 1, index + 1);
	let right = line.slice(index + 1, index + 1 + sliceLength);
	console.log('left', left);
	console.log('right', right);
	right.reverse();
	if (isEqual(left, right)) {
		console.log('true');
		return true;
	}
	console.log('false');
	return false;
};

const findVerticalReflection = (map: string[]): null | number => {
	console.log('map', map);
	let mapLinesAsArray = map.map((line) => line.split(''));
	for (let i = 0; i < mapLinesAsArray.length; i++) {
		if (mapLinesAsArray.every((line) => isLineReflectedAtIndex(line, i))) {
			return i;
		}
		break;
	}
	return null;
};

const findHorizontalReflection = (map: string[]) => {};

// console.log(findVerticalReflection(maps[0]));
let thing = maps[0].map((line) => line.split(''));
for (let i = 0; i < thing.length; i++) {
	isLineReflectedAtIndex(thing[0], i);
}
// for (const map of maps) {
// 	let verticalReflectionIndex = findVerticalReflection(map);
// 	let horizontalReflectionIndex = findHorizontalReflection(map);
// }
