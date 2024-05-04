// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
