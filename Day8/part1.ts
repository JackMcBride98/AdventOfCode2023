import { readFileSync } from 'fs';

let contents = readFileSync('input.txt', 'utf8').split('\r\n');

let leftRightInstructions = contents[0];

type Node = {
	name: string;
	left: string;
	right: string;
};

let nodes: Node[] = contents.slice(2).map((line) => {
	let name = line.slice(0, 3);
	let left = line.slice(7, 10);
	let right = line.slice(12, 15);

	return { name, left, right };
});

console.log(leftRightInstructions);

let steps = 0;

let hasReachedZZZ = false;

let currentNode = nodes.find((node) => node.name === 'AAA');

while (!hasReachedZZZ) {
	for (let i = 0; i < leftRightInstructions.length; i++) {
		let instruction = leftRightInstructions[i];

		if (instruction === 'L') {
			currentNode = nodes.find((node) => node.name === currentNode.left);
		} else if (instruction === 'R') {
			currentNode = nodes.find((node) => node.name === currentNode.right);
		}

		steps++;

		if (currentNode.name === 'ZZZ') {
			hasReachedZZZ = true;
			break;
		}
	}
}

console.log(steps);
