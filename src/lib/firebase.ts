// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {

};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

console.log("✅ Firebase config YÜKLENDİ");

export const db = getDatabase(app);
