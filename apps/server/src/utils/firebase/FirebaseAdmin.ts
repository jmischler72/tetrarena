import * as admin from 'firebase-admin';
import { FirebaseService } from './FirebaseService';

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

FirebaseService.resetUsersInRoom();
