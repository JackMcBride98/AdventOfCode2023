import { readFileSync } from 'fs';
import { sum } from 'lodash';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

type Round = {
	blue?: number;
	red?: number;
	green?: number;
};

type Game = {
	id: number;
	rounds: Array<Round>;
	minBlue?: number;
	minRed?: number;
	minGreen?: number;
};

type CubeConfig = {
	blue: number;
	red: number;
	green: number;
};

const mapLineToGame = (line: string): Game => {
	const id = parseInt(line.match(/(?<=Game )\d*/g)[0]);
	const roundStrings = line.split(':')[1].split(';');
	const rounds: Array<Round> = [];
	for (const rs of roundStrings) {
		rounds.push({
			blue: parseInt(rs.match(/\d*(?= blue)/g)?.at(0)),
			red: parseInt(rs.match(/\d*(?= red)/g)?.at(0)),
			green: parseInt(rs.match(/\d*(?= green)/g)?.at(0)),
		});
	}
	return { id, rounds };
};

const isPossible = (game: Game, cubeConfig: CubeConfig): boolean => {
	for (const round of game.rounds) {
		if (
			round.blue > cubeConfig.blue ||
			round.red > cubeConfig.red ||
			round.green > cubeConfig.green
		) {
			return false;
		}
	}
	return true;
};

const calculateMinCubeValuesForGame = (game: Game) => {
	let minBlue = 0,
		minRed = 0,
		minGreen = 0;
	for (const round of game.rounds) {
		minBlue = round.blue > minBlue ? round.blue : minBlue;
		minRed = round.red > minRed ? round.red : minRed;
		minGreen = round.green > minGreen ? round.green : minGreen;
	}
	game = { ...game, minBlue, minRed, minGreen };
	return game;
};

const cubeConfig: CubeConfig = { blue: 14, red: 12, green: 13 };

let games = contents.map((line) => mapLineToGame(line));

let idSumOfPossibleGames = sum(
	games.filter((game) => isPossible(game, cubeConfig)).map((game) => game.id)
);

games = games.map((game) => calculateMinCubeValuesForGame(game));

let powerOfCubeSetGamesSum = sum(
	games.map((game) => game.minBlue * game.minRed * game.minGreen)
);

console.log(powerOfCubeSetGamesSum);
