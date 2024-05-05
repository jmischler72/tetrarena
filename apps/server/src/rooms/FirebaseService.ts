import { logger } from '@colyseus/core/build/Logger';
import { db } from './FirebaseAdmin';
import * as admin from 'firebase-admin';

export async function increaseWinsForUser(userId: string) {
	const userRef = db.collection('users').doc(userId);
	logger.info('Increasing wins for : ' + userId);

	const doc = await userRef.get();
	if (!doc.exists) {
		logger.info('Creating document : ' + userId);

		let username = 'Guest-' + userId.substring(0, 6);

		await userRef
			.set({
				username: username,
				wins: admin.firestore.FieldValue.increment(1),
			})
			.catch((e) => {
				logger.error('Error increasing wins : ' + e);
			});
	} else {
		logger.debug('Updating document : ' + userId);

		await userRef
			.update({
				wins: admin.firestore.FieldValue.increment(1),
			})
			.catch((e) => {
				logger.error('Error increasing wins : ' + e);
			});
	}
}
