import {
	EmailAuthProvider,
	linkWithCredential,
	onAuthStateChanged,
	sendEmailVerification,
	signInAnonymously,
} from 'firebase/auth';
import { auth, db } from './FirebaseClient';
import { snackbarStore } from '$lib/stores/SnackbarStore';
import { clientStore, userStore } from '$lib/stores/MultiplayerStore';
import { ref, get as getFromDb, child, orderByChild, query, limitToFirst, set, onValue } from 'firebase/database';
import { get } from 'svelte/store';
import type { UserInfos } from '@jmischler72/shared';

export async function initUser() {
	return new Promise<void>((resolve) => {
		onAuthStateChanged(auth, async (user) => {
			if (!user) {
				console.log('User is logged out');
				snackbarStore.set('Connecting as guest');
				let u = await signInAnonymously(auth);
				user = u.user;
			}

			console.log('User is logged in');
			get(clientStore).auth.token = await user.getIdToken(true);
			userStore.set(user);
			resolve();
		});
	});
}

export async function getUserInfos() {
	if (!auth.currentUser) return null;
	let currentUser: UserInfos = {
		username: 'Guest-' + auth.currentUser.uid.substring(0, 6),
	};
	let snapshot = await getFromDb(ref(db, 'users/' + auth.currentUser.uid));
	if (snapshot.exists()) {
		currentUser = snapshot.val() as UserInfos;
	}

	console.log(currentUser);

	return currentUser;
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
