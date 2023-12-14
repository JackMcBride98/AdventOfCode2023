import { cp, readFileSync } from 'fs';
import { first } from 'lodash';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');
let time = parseInt(
	contents[0]
		.split(':')[1]
		.split(' ')
		.map((s) => parseInt(s))
		.filter((n) => !isNaN(n))
		.map((n) => n.toString())
		.join('')
);

let distance = parseInt(
	contents[1]
		.split(':')[1]
		.split(' ')
		.map((s) => parseInt(s))
		.filter((n) => !isNaN(n))
		.map((n) => n.toString())
		.join('')
);

console.log(distance);
console.log(time);

type Race = {
	time: number;
	distance: number;
};

let race: Race = {
	time: time,
	distance: distance,
};

let firstBeatRaceIndex = 0;

for (let ms = 0; ms <= race.time; ms++) {
	let speed = ms;
	let timeLeft = race.time - speed;
	if (speed * timeLeft > race.distance) {
		firstBeatRaceIndex = ms;
		break;
	}
}

let lastBeatRaceIndex = race.time;

for (let ms = lastBeatRaceIndex; ms > firstBeatRaceIndex; ms--) {
	let speed = ms;
	let timeLeft = race.time - speed;
	if (speed * timeLeft > race.distance) {
		lastBeatRaceIndex = ms;
		break;
	}
}

console.log(firstBeatRaceIndex);
console.log(lastBeatRaceIndex);
console.log(lastBeatRaceIndex - firstBeatRaceIndex + 1);
console.log(race);

// console.log(races.reduce((a, b) => a * b.waysToBeatRace, 1));
