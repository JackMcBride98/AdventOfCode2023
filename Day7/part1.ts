import { readFileSync } from 'fs';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

type Hand = {
	hand: string;
	bid: number;
};

type HandType =
	| 'FiveofAKind'
	| 'FourOfAKind'
	| 'FullHouse'
	| 'ThreeOfAKind'
	| 'TwoPair'
	| 'OnePair'
	| 'HighCard';

let hands: Hand[] = contents.map((line) => {
	let [hand, bid] = line.split(' ');
	return { hand, bid: parseInt(bid) };
});

const sortByFrequency = (hand: string[]): string[] => {
	let frequency = new Map<string, number>();
	for (const card of hand) {
		if (frequency.has(card)) {
			frequency.set(card, frequency.get(card) + 1);
		} else {
			frequency.set(card, 1);
		}
	}

	let sorted = [...frequency.entries()].sort((a, b) => b[1] - a[1]);

	let sortedHand: string[] = [];
	for (const [card, count] of sorted) {
		for (let i = 0; i < count; i++) {
			sortedHand.push(card);
		}
	}

	return sortedHand;
};

const getHandTypeRanking = (handType: HandType): number => {
	switch (handType) {
		case 'FiveofAKind':
			return 1;
		case 'FourOfAKind':
			return 2;
		case 'FullHouse':
			return 3;
		case 'ThreeOfAKind':
			return 4;
		case 'TwoPair':
			return 5;
		case 'OnePair':
			return 6;
		case 'HighCard':
			return 7;
		default:
			throw new Error('Invalid hand type');
			return -1;
			break;
	}
};

const getHandType = (hand1: string): HandType => {
	let cards = sortByFrequency(hand1.split(''));
	if (cards.every((card) => card === cards[0])) {
		return 'FiveofAKind';
	}
	if (cards[0] === cards[3]) {
		return 'FourOfAKind';
	}
	if (cards[0] === cards[2] && cards[3] === cards[4]) {
		return 'FullHouse';
	}
	if (cards[0] === cards[2]) {
		return 'ThreeOfAKind';
	}
	if (cards[0] === cards[1] && cards[2] === cards[3]) {
		return 'TwoPair';
	}
	if (new Set(cards).size === 4) {
		return 'OnePair';
	}
	return 'HighCard';
};

let cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const rankCard = (card: string): number => {
	return cards.indexOf(card) + 1;
};

const rank = (hand1: string, hand2: string): number => {
	let hand1Type = getHandType(hand1);
	let hand2Type = getHandType(hand2);

	if (hand1Type !== hand2Type) {
		return getHandTypeRanking(hand1Type) - getHandTypeRanking(hand2Type);
	}
	for (let i = 0; i < hand1.length; i++) {
		if (hand1[i] === hand2[i]) {
			continue;
		}
		return rankCard(hand1[i]) - rankCard(hand2[i]);
	}
	return 0;
};

console.log(hands);

hands.sort((hand1, hand2) => rank(hand1.hand, hand2.hand));
hands.reverse();

let totalWinnings = 0;

for (let i = 0; i < hands.length; i++) {
	totalWinnings += hands[i].bid * (i + 1);
}

console.log(totalWinnings);
