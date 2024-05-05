import * as admin from 'firebase-admin';

export const app = admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
		privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // NOW THIS WORKS!!!
	}),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	databaseAuthVariableOverride: {
		uid: 'tetrarena-server',
	},
});

export const db = admin.firestore(app);
