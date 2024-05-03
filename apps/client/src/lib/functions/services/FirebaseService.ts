import { getAuth, signInAnonymously, type UserCredential } from 'firebase/auth';
import { app } from './firebase.client';
import { snackbarStore } from '$lib/stores/snackbarStore';

export async function initUser(params: type) {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			const uid = user.uid;
			// ...
		} else {
			// User is signed out
			// ...
		}
	});
}
export async function guestLogin() {
	const auth = getAuth(app);

	await signInAnonymously(auth).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		snackbarStore.set(errorCode + errorMessage);
		return undefined;
	});
}
