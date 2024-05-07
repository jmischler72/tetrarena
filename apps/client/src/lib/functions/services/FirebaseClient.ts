import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC5b0PDOGx825jRGwFUvcX52UjEUNziys0',
	authDomain: 'tetrarena-7888b.firebaseapp.com',
	projectId: 'tetrarena-7888b',
	storageBucket: 'tetrarena-7888b.appspot.com',
	messagingSenderId: '781434913614',
	appId: '1:781434913614:web:276e03bfee536af463141f',
	measurementId: 'G-RPGS9R41GP',
	databaseURL: 'https://tetrarena-7888b-default-rtdb.europe-west1.firebasedatabase.app/',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
