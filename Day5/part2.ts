import { readFileSync } from 'fs';
import { chunk, min, orderBy } from 'lodash';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

let seedRanges: number[][] = chunk(
	contents[0]
		.split(': ')[1]
		.split(' ')
		.map((v) => parseInt(v)),
	2
);

type SubMap = {
	destinationRangeStart: number;
	sourceRangeStart: number;
	rangeLength: number;
};

type Map = {
	source: string;
	destination: string;
	subMaps: Array<SubMap>;
};

let maps: Array<Map> = [];

for (let i = 2; i < contents.length; i++) {
	let source = contents[i].match(/\w*(?=-to)/g)[0];
	let destination = contents[i].match(/(?<=to-)\w*/g)[0];
	let subMaps: SubMap[] = [];
	i++;
	while (contents[i] !== undefined && contents[i] !== '') {
		let nums = contents[i].split(' ').map((n) => parseInt(n));
		subMaps.push({
			destinationRangeStart: nums[0],
			sourceRangeStart: nums[1],
			rangeLength: nums[2],
		});
		i++;
	}

	maps.push({ source, destination, subMaps });
}

console.log(maps);

maps.unshift({
	source: 'seed',
	destination: 'soil',
	subMaps: seedRanges.map((sr) => ({
		destinationRangeStart: sr[0],
		sourceRangeStart: sr[0],
		rangeLength: sr[1],
	})),
});

const mapRanges = (seedRanges: number[][], map: Map): number[][] => {
	let result = [];
	for (const seedRange of seedRanges) {
		for (const subMap of map.subMaps) {
			//fits entirely into a range
			if (
				subMap.sourceRangeStart <= seedRange[0] &&
				subMap.rangeLength >= seedRange[1]
			) {
				result.push([
					subMap.destinationRangeStart - subMap.sourceRangeStart + seedRange[0],
					seedRange[1],
				]);
			}
			// interval starts in mapping ranged
			if (
				subMap.sourceRangeStart <= seedRange[0] &&
				subMap.rangeLength <= seedRange[1]
			) {
				// result.push([subMap.destinationRangeStart - subMap.sourceRangeStart + seedRange[0], subMap.rangeLength + ])
			}
		}
	}
	return result;
};

for (const map of maps) {
	seedRanges = mapRanges(seedRanges, map);
}
