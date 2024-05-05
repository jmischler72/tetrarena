import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore } from '$lib/stores/MultiplayerStore';
import { ref, get as getFromDb, child } from 'firebase/database';
import { get } from 'svelte/store';

export async function initUser() {
	if (auth.currentUser) return;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			snackbarStore.set('Logged in');

			user
				.getIdToken(true)
				.then((idToken) => {
					get(clientStore).auth.token = idToken;
				})
				.catch(function (error) {
					const errorCode = error.code;
					const errorMessage = error.message;
					snackbarStore.set(errorCode + errorMessage);
				});
		} else {
			snackbarStore.set('Connecting as guest');

			guestLogin();
		}
	});
}
async function guestLogin() {
	await signInAnonymously(auth).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		snackbarStore.set(errorCode + errorMessage);
	});
}

export async function getUsername() {
	if (!auth.currentUser) return '';
	const userRef = ref(db, 'users/' + auth.currentUser.uid);
	let username: string = await getFromDb(child(userRef, 'username'))
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
	return username;
}
