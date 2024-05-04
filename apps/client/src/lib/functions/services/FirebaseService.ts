import { getAuth, onAuthStateChanged, signInAnonymously, type UserCredential } from 'firebase/auth';
import { app, db } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore, userStore } from '$lib/stores/MultiplayerStore';
import { get } from 'svelte/store';
import { ref, set } from 'firebase/database';

export async function initUser() {
	const auth = getAuth();

	if (auth.currentUser) return;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			snackbarStore.set('Logged in');

			userStore.set(user);
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
	const auth = getAuth(app);

	await signInAnonymously(auth).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		snackbarStore.set(errorCode + errorMessage);
	});

	let username = 'Guest-' + auth.currentUser?.uid.substring(0, 6);

	set(ref(db, 'users/' + auth.currentUser?.uid), {
		username: username,
	});
}

// export function getUserFromDb() {
// 	ref(db, 'users/' + auth.currentUser?.uid);
// }
