const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

// Memanggil KTP rahasia
const serviceAccount = JSON.parse(process.env.FIREBASE_JSON);

// Menyalakan Firebase dengan cara baru (Modular)
initializeApp({
    credential: cert(serviceAccount)
});

// Mengaktifkan fitur Firestore dan Auth
const db = getFirestore();
const auth = getAuth();

console.log("✅ Firebase Admin & Firestore berhasil terhubung!");

// Mengekspor auth dan db
module.exports = { auth, db };