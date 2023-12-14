import { cp, readFileSync } from 'fs';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');
let times = contents[0]
	.split(':')[1]
	.split(' ')
	.map((s) => parseInt(s))
	.filter((n) => !isNaN(n));

let distances = contents[1]
	.split(':')[1]
	.split(' ')
	.map((s) => parseInt(s))
	.filter((n) => !isNaN(n));

type Race = {
	time: number;
	distance: number;
	waysToBeatRace: number;
};

let races: Race[] = new Array(times.length).fill(420).map((_, i) => ({
	time: times[i],
	distance: distances[i],
	waysToBeatRace: 0,
}));

for (const race of races) {
	for (let ms = 0; ms <= race.time; ms++) {
		let speed = ms;
		let timeLeft = race.time - speed;
		if (speed * timeLeft > race.distance) {
			console.log(speed, timeLeft, speed * timeLeft);
			race.waysToBeatRace++;
		}
	}
}

console.log(races);

console.log(races.reduce((a, b) => a * b.waysToBeatRace, 1));
