import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, db } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore } from '$lib/stores/MultiplayerStore';
import { ref, get as getFromDb, child } from 'firebase/database';
import { get } from 'svelte/store';

export async function initUser() {
	return new Promise<void>((resolve, reject) => {
		if (auth.currentUser) {
			resolve(); // Resolve immediately if user is already logged in
		} else {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					snackbarStore.set('Logged in');
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
	console.log('Logged in as guest');
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
