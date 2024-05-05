import { getAuth, onAuthStateChanged, signInAnonymously, type UserCredential } from 'firebase/auth';
import { auth } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore, userStore } from '$lib/stores/MultiplayerStore';
import { get } from 'svelte/store';

export async function initUser() {
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
	await signInAnonymously(auth).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		snackbarStore.set(errorCode + errorMessage);
	});
}
