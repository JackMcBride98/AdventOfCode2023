import { readFileSync } from 'fs';

let contents = readFileSync('example.txt', 'utf8').split('\r\n');

type Row = {
	map: string[];
	contigousGroups: number[];
};

let rows = contents.map((line) => {
	let [map, contigousGroups] = line.split(' ');
	return {
		map: map.split(''),
		contigousGroups: contigousGroups.split(',').map((group) => parseInt(group)),
	};
});
