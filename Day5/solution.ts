import { readFileSync } from 'fs';

let contents = readFileSync('example.txt', 'utf8').split('\r\n');

let seeds: number[] = contents[0]
	.split(': ')[1]
	.split(' ')
	.map((v) => parseInt(v));

console.log(seeds);
