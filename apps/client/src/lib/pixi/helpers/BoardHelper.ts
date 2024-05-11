export function getDeletedLines(previousLines: string[], currentLines: string[]): number[] {
	return previousLines
		.map((item, index) => ({
			item,
			index,
		}))
		.filter(({ item }) => !currentLines.includes(item))
		.map(({ index }) => index);
}
