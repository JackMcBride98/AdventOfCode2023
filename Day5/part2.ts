import { readFileSync } from 'fs';
import { chunk, min, orderBy } from 'lodash';
import { sourceMapsEnabled } from 'process';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

let seedRanges: number[][] = chunk(
	contents[0]
		.split(': ')[1]
		.split(' ')
		.map((v) => parseInt(v)),
	2
);

type SeedRange = {
	start: number;
	length: number;
};

let mappedSeedRanges: SeedRange[] = seedRanges.map((sr) => ({
	start: sr[0],
	length: sr[1],
}));

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

const mapRanges = (theSeedRanges: SeedRange[], map: Map): SeedRange[] => {
	let seedRanges = [...theSeedRanges];
	let result = [];
	console.log('map', map);
	let count = 0;
	for (const range of seedRanges) {
		console.log('range', range);
		let isRangeMapped = false;
		for (const subMap of map.subMaps) {
			console.log('subMap', subMap);
			//fits entirely into a range
			if (
				range.start >= subMap.sourceRangeStart &&
				range.start + range.length <=
					subMap.sourceRangeStart + subMap.rangeLength
			) {
				console.log('fits entirely into a range');
				result.push({
					start:
						subMap.destinationRangeStart -
						subMap.sourceRangeStart +
						range.start,
					length: range.length,
				});
				isRangeMapped = true;
				continue;
			}
			// interval starts in mapping range but goes past the end
			else if (
				range.start >= subMap.sourceRangeStart &&
				range.start < subMap.sourceRangeStart + subMap.rangeLength &&
				range.start + range.length >
					subMap.sourceRangeStart + subMap.rangeLength
			) {
				console.log('interval starts in mapping range but goes past the end');
				//add mapped start of range
				result.push({
					start:
						subMap.destinationRangeStart -
						subMap.sourceRangeStart +
						range.start,
					length:
						range.start +
						range.length -
						(subMap.sourceRangeStart + subMap.rangeLength),
				});
				//append the rest to result
				seedRanges.push({
					start: subMap.sourceRangeStart + subMap.rangeLength,
					length:
						range.start +
						range.length -
						(subMap.sourceRangeStart + subMap.rangeLength),
				});
				console.log('result', result);
				console.log('seedRanges', seedRanges);
				isRangeMapped = true;
				continue;
			}
			//interval starts before the range but runs into it
			else if (
				range.start < subMap.sourceRangeStart &&
				range.start + range.length >= subMap.sourceRangeStart &&
				range.start + range.length <
					subMap.sourceRangeStart + subMap.rangeLength
			) {
				console.log('interval starts before the range btu runs into it');
				//add mapped end of range
				result.push({
					start: subMap.destinationRangeStart,
					length: range.start + range.length - subMap.sourceRangeStart,
				});
				//append the start to result
				seedRanges.push({
					start: range.start,
					length: subMap.sourceRangeStart - range.start,
				});
				isRangeMapped = true;
				continue;
			}
			//seed range starts before and ends after the interval
			else if (
				subMap.sourceRangeStart >= range.start &&
				subMap.sourceRangeStart + subMap.rangeLength <
					range.start + range.length
			) {
				console.log('seed range starts before and ends after the interval');
				//add middle mapped bit to result
				result.push({
					start: subMap.destinationRangeStart,
					length: subMap.rangeLength,
				});
				//push start to ranges
				seedRanges.push({
					start: range.start,
					length: subMap.sourceRangeStart - range.start,
				});
				//push end to ranges
				seedRanges.push({
					start: subMap.sourceRangeStart + subMap.rangeLength,
					length:
						range.start +
						range.length -
						(subMap.sourceRangeStart + subMap.rangeLength),
				});
				isRangeMapped = true;
				continue;
			}
		}
		if (!isRangeMapped) {
			console.log('range not mapped');
			result.push(range);
		}
		console.log('seedRanges', seedRanges);
		console.log('result', result);
		if (count > 5) {
			break;
		}
		count++;
	}
	return result;
};

for (const map of maps) {
	mappedSeedRanges = mapRanges(mappedSeedRanges, map);
	console.log(mappedSeedRanges);
}

console.log(min(mappedSeedRanges.map((msr) => msr.start)));
