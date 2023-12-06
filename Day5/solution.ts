import { readFileSync } from 'fs';
import { min } from 'lodash';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

let startSeeds: number[] = contents[0]
	.split(': ')[1]
	.split(' ')
	.map((v) => parseInt(v));

let seeds = [];

for (let i = 0; i < startSeeds.length; i += 2) {
	console.log(startSeeds[i]);
	for (let j = startSeeds[i]; j < startSeeds[i] + startSeeds[i + 1]; j++) {
		seeds.push(j);
	}
}

console.log(seeds);

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

const getMappedLocationNumber = (map: Map, source: number): number => {
	for (const subMap of map.subMaps) {
		if (
			source >= subMap.sourceRangeStart &&
			source < subMap.sourceRangeStart + subMap.rangeLength
		) {
			return subMap.destinationRangeStart + (source - subMap.sourceRangeStart);
		}
	}
	return source;
};

const locationNumbers = [];

for (const seed of seeds) {
	let locationNumber = seed;
	for (const map of maps) {
		locationNumber = getMappedLocationNumber(map, locationNumber);
	}
	locationNumbers.push(locationNumber);
}

console.log(min(locationNumbers));
