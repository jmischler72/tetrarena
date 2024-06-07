import { logger } from '@colyseus/core/build/Logger';
import { authApp, db } from './FirebaseAdmin';
import { UserInfos } from '@jmischler72/shared';

export class FirebaseService {
	static async verifyUser(token: string) {
		const decodedToken = await authApp.verifyIdToken(token);
		return FirebaseService.checkIfUserNotInRoom(decodedToken.uid).then((notInRoom) => {
			if (notInRoom) {
				logger.info('User not in room');
				return decodedToken;
			}
			throw new Error('User already in room');
		});
	}

	static async checkIfUserNotInRoom(userId: string) {
		const userRef = db.ref('rooms/' + userId);

		const data = await userRef.once('value');
		return !data.exists();
	}

	static async setUserInRoom(userId: string, roomId: string | null) {
		const userRef = db.ref('rooms/' + userId);
		logger.info('Setting roomId: ' + roomId + 'for: ' + userId);

		userRef.set(roomId);
	}

	static async checkIfUserIsAnonymous(userId: string) {
		try {
			const userRecord = await authApp.getUser(userId);
			if (userRecord.providerData.length === 0) {
				logger.debug('User is anonymous');
				return true;
			} else {
				logger.debug('User is authenticated');
				return false;
			}
		} catch (error) {
			logger.error('Error fetching user data:', error);
		}
	}

	static async updateRankForUser(userId: string, rank: number) {
		const userRef = db.ref('users/' + userId);
		logger.info('Updating rank for : ' + userId + ' to: ' + rank);

		userRef.child('username').once('value', (data) => {
			if (!data.exists()) return userRef.child('username').set('Guest-' + userId.substring(0, 6));
		});

		userRef.child('rank').transaction((current_value) => {
			return (current_value || 500) + rank;
		});

		this.checkIfUserIsAnonymous(userId).then((isAnonymous) => {
			if (isAnonymous) userRef.child('isAnonymous').set(true);
		});
	}

	static async getUserInfos(userId: string) {
		logger.info('Getting user infos for : ' + userId);

		const userRef = db.ref('users/' + userId);
		const snapshot = await userRef.once('value');
		if (snapshot.exists()) return snapshot.val() as UserInfos;
		return null;
	}
}
