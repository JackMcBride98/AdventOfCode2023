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

let hasReachedNodeEndingInZ = false;

let currentNodes = nodes.filter((node) => node.name.at(-1) === 'A');

let foundZCycles = currentNodes.map((cn) => []);

console.log(currentNodes);

while (!hasReachedNodeEndingInZ) {
	for (let i = 0; i < leftRightInstructions.length; i++) {
		let instruction = leftRightInstructions[i];

		hasReachedNodeEndingInZ = false;

		for (let i = 0; i < currentNodes.length; i++) {
			if (instruction === 'L') {
				currentNodes[i] = nodes.find(
					(node) => node.name === currentNodes[i].left
				);
			} else if (instruction === 'R') {
				currentNodes[i] = nodes.find(
					(node) => node.name === currentNodes[i].right
				);
			}
		}

		steps++;

		if (steps >= 100000) {
			hasReachedNodeEndingInZ = true;
			break;
		}

		for (let i = 0; i < currentNodes.length; i++) {
			if (currentNodes[i].name.at(-1) === 'Z') {
				console.log(`current node ${i} ${steps} steps, found Z`);
				foundZCycles[i].push(steps);
			}
		}
		if (currentNodes.every((cn) => cn.name.at(-1) === 'Z')) {
			hasReachedNodeEndingInZ = true;
			break;
		}
	}
}

console.log(steps);
console.log(foundZCycles);
//I then used these cycles to calcualte the lcm of all the cycles
