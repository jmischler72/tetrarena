export function getDeletedLines(previousLines: string[], currentLines: string[]): number[] {
	return previousLines
		.map((item, index) => ({
			item,
			index,
		}))
		.filter(({ item }) => !currentLines.includes(item))
		.map(({ index }) => index);
}

export function getAddedLines(previousLines: string[], currentLines: string[]): number {
	let index = currentLines.findIndex((item) => item === previousLines.at(-1));
	if (index !== -1) return currentLines.length - currentLines.findIndex((item) => item === previousLines.at(-1)) - 1;
	return 0;
}
