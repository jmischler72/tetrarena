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
	return currentLines
		.map((item, index) => ({
			item,
			index,
		}))
		.filter(({ item }) => !previousLines.includes(item)).length;
}
