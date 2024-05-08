export function generateRandomIcons(icon: string) {
	let randomString: string = (Math.random() + 1).toString(36).substring(2);

	let icons = [];

	for (let i = 0; i < 20; i++) {
		icons.push(randomString + i);
	}

	if (icon !== '') {
		icons[0] = icon;
	}

	return icons;
}
