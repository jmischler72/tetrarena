import * as admin from 'firebase-admin';

export const app = admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	}),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	databaseAuthVariableOverride: {
		uid: 'tetrarena-server',
	},
});

export const db = admin.database(app);
export const authApp = admin.auth(app);

function resetUsersInRoom() {
	let usersRef = db.ref('/rooms/');
	usersRef.remove();
}
resetUsersInRoom();
