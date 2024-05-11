import {
	EmailAuthProvider,
	linkWithCredential,
	onAuthStateChanged,
	sendEmailVerification,
	signInAnonymously,
} from 'firebase/auth';
import { auth, db } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore } from '$lib/stores/MultiplayerStore';
import { ref, get as getFromDb, child, orderByChild, query, limitToFirst, set } from 'firebase/database';
import { get } from 'svelte/store';
import type { User } from '@jmischler72/shared';

export async function initUser() {
	return new Promise<void>((resolve, reject) => {
		if (auth.currentUser) {
			resolve(); // Resolve immediately if user is already logged in
		} else {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					get(clientStore).auth.token = await user.getIdToken(true);
					resolve(); // Resolve once token is obtained
				} else {
					snackbarStore.set('Connecting as guest');
					guestLogin().then(resolve).catch(reject); // Resolve with guest login
				}
			});
		}
	});
}
async function guestLogin() {
	await signInAnonymously(auth);
	if (auth.currentUser) get(clientStore).auth.token = await auth.currentUser.getIdToken(true);
}

export async function getLeaderboard() {
	const usersRef = ref(db, 'users');
	const quUsers = query(usersRef, orderByChild('wins'), limitToFirst(20));

	const snapshot = await getFromDb(quUsers);
	if (snapshot.exists()) {
		let users: { username: string; wins: number }[] = [];
		snapshot.forEach((userSnapshot) => {
			if (userSnapshot.val().wins) users.push(userSnapshot.val());
		});

		users.sort((a, b) => (a.wins > b.wins ? -1 : 1));

		return users;
	}
	return [];
}

export async function setUserInfos(infos: User) {
	if (!auth.currentUser) return '';

	const userRef = ref(db, 'users/' + auth.currentUser.uid);

	return set(child(userRef, 'username'), infos.username);
}

export async function linkAccount(email: string, password: string) {
	if (!auth.currentUser) return;

	const credential = await EmailAuthProvider.credential(email, password);

	await linkWithCredential(auth.currentUser, credential)
		.then((usercred) => {
			const user = usercred.user;
			console.log('Anonymous account successfully upgraded', user);
		})
		.catch((error) => {
			console.log('Error upgrading anonymous account', error);
		});

	await sendEmailVerification(auth.currentUser);
}
