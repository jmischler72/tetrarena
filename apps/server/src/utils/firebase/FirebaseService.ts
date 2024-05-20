import { logger } from '@colyseus/core/build/Logger';
import { db } from './FirebaseAdmin';
import { UserInfos } from '@jmischler72/shared';

export class FirebaseService {
	static async checkIfUserNotInRoom(userId: string) {
		const userRef = db.ref('rooms/' + userId);

		let data = await userRef.once('value');
		return !data.exists();
	}

	static async setUserInRoom(userId: string, roomId: string | null) {
		const userRef = db.ref('rooms/' + userId);
		logger.info('Setting roomId: ' + roomId + 'for: ' + userId);

		userRef.set(roomId);
	}

	static async increaseWinsForUser(userId: string) {
		const userRef = db.ref('users/' + userId);
		logger.info('Increasing wins for : ' + userId);

		userRef.child('username').once('value', (data) => {
			if (!data.exists()) return userRef.child('username').set('Guest-' + userId.substring(0, 6));
		});

		userRef.child('wins').transaction((current_value) => {
			return (current_value || 0) + 1;
		});
	}

	static async setEloForUser(userId: string, elo: number) {
		logger.info('Setting elo for : ' + userId);

		const userRef = db.ref('users/' + userId);

		userRef.child('elo').set(elo);
	}

	static async getUserInfos(userId: string) {
		logger.info('Getting username for : ' + userId);

		let currentUser: UserInfos = {
			username: 'Guest-' + userId.substring(0, 6),
		};

		const userRef = db.ref('users/' + userId);
		let snapshot = await userRef.once('value');
		if (snapshot.exists()) {
			currentUser = snapshot.val() as UserInfos;
		}

		return currentUser;
	}

	static async resetUsersInRoom() {
		let usersRef = db.ref('/rooms/');
		usersRef.remove();
	}
}
