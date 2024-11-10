import { EmailAuthProvider, linkWithCredential, sendEmailVerification, signInAnonymously } from 'firebase/auth';
import { auth, db } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore } from '$lib/stores/MultiplayerStore';
import { ref, get as getFromDb, child, orderByChild, query, limitToFirst, set } from 'firebase/database';
import { get } from 'svelte/store';
import type { UserInfos } from '@jmischler72/shared';

export async function initUser() {
	return new Promise<void>((resolve) => {
		auth.onAuthStateChanged(async (user) => {
			if (!user) {
				console.log('User is logged out');
				snackbarStore.set('Connecting as guest');
				user = (await signInAnonymously(auth)).user;
			}

			console.log('User is logged in as ' + (user.isAnonymous ? 'anonymous' : 'registered'));
			get(clientStore).auth.token = await user.getIdToken(true);
			resolve();
		});
	});
}

export async function getUserInfos() {
	console.log('Getting user infos', auth.currentUser);
	if (!auth.currentUser) return null;
	let currentUser = {
		username: 'Guest-' + auth.currentUser.uid.substring(0, 6),
	};
	const snapshot = await getFromDb(ref(db, 'users/' + auth.currentUser.uid));
	if (snapshot.exists()) {
		currentUser = snapshot.val() as UserInfos;
	}

	console.log(currentUser);

	return currentUser;
}

export async function getLeaderboard() {
	const usersRef = ref(db, 'users');
	const quUsers = query(usersRef, orderByChild('rank'), limitToFirst(20));

	const snapshot = await getFromDb(quUsers);
	if (snapshot.exists()) {
		const users: { username: string; rank: number; isAnonymous: any; isCurrentUser: boolean }[] = [];
		snapshot.forEach((userSnapshot) => {
			if (userSnapshot.val().rank)
				users.push({ ...userSnapshot.val(), isCurrentUser: userSnapshot.key === auth.currentUser?.uid });
		});

		const filteredUsers = users.sort((a, b) => (a.rank > b.rank ? -1 : 1));

		return filteredUsers;
	}
	return [];
}

export async function setUserInfos(infos: UserInfos) {
	if (!auth.currentUser) return;

	const userRef = ref(db, 'users/' + auth.currentUser.uid);

	return set(child(userRef, 'username'), infos.username);
}

export async function linkAccount(email: string, password: string) {
	if (!auth.currentUser) return;

	const credential = await EmailAuthProvider.credential(email, password);

	await linkWithCredential(auth.currentUser, credential);

	await sendEmailVerification(auth.currentUser);
}
