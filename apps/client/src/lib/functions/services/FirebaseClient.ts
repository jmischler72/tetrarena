import { firebaseConfigDev } from '$lib/data/firebase.dev';
import { firebaseConfigProd } from '$lib/data/firebase.prod';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

let firebaseConfig = firebaseConfigDev;
if (import.meta.env.PROD) firebaseConfig = firebaseConfigProd;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
