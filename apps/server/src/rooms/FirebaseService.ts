import { logger } from '@colyseus/core/build/Logger';
import { db } from './FirebaseAdmin';

export async function increaseWinsForUser(userId: string) {
	const userRef = db.ref('users/' + userId);
	logger.info('Increasing wins for : ' + userId);

	userRef.child('username').once('value', (data) => {
		if (!data.exists()) return userRef.child('username').set('Guest-' + userId.substring(0, 6));
	});

	userRef.child('wins').transaction((current_value) => {
		return (current_value || 0) + 1;
	});
}
