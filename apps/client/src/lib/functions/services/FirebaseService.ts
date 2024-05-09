import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore } from '$lib/stores/MultiplayerStore';
import { ref, get as getFromDb, child, orderByChild, query, limitToFirst } from 'firebase/database';
import { get } from 'svelte/store';

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

export async function getUsername() {
	if (!auth.currentUser) return '';

	const userRef = ref(db, 'users/' + auth.currentUser.uid);
	return getFromDb(child(userRef, 'username'))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				return 'Guest-' + auth.currentUser!.uid.substring(0, 6);
			}
		})
		.catch((error) => {
			console.error(error);
		});
}

export async function getLeaderboard() {
	const usersRef = ref(db, 'users');
	const quUsers = query(usersRef, orderByChild('wins'), limitToFirst(20));

	return getFromDb(quUsers)
		.then((snapshot) => {
			if (snapshot.exists()) {
				let users: { username: string; wins: number }[] = [];
				snapshot.forEach((userSnapshot) => {
					if (userSnapshot.val().wins) users.push(userSnapshot.val());
				});

				users.sort((a, b) => (a.wins > b.wins ? -1 : 1));

				return users;
			}
			return [];
		})
		.catch((error) => {
			console.error(error);
		});
}
