const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');
const fs = require('fs');

let db = null;
let auth = null;

try {
    let serviceAccount = null;

    // 1. Cek apakah ada variabel FIREBASE_JSON di Environment (Railway / .env)
    if (process.env.FIREBASE_JSON) {
        serviceAccount = JSON.parse(process.env.FIREBASE_JSON);
    } else {
        // 2. Fallback: Baca langsung dari file serviceAccountKey.json jika ada
        const keyPath = path.join(__dirname, '../serviceAccountKey.json');
        if (fs.existsSync(keyPath)) {
            serviceAccount = require(keyPath);
        }
    }

    if (serviceAccount) {
        if (getApps().length === 0) {
            initializeApp({
                credential: cert(serviceAccount)
            });
        }
        db = getFirestore();
        auth = getAuth();
        console.log("✅ Firebase Admin & Firestore berhasil terhubung!");
    } else {
        console.warn("⚠️ Peringatan: FIREBASE_JSON atau serviceAccountKey.json belum ditemukan. Fitur Admin Firebase dinonaktifkan sementara agar server tetap menyala.");
    }
} catch (error) {
    console.error("⚠️ Gagal menginisialisasi Firebase Admin (Server tetap berjalan):", error.message);
}

module.exports = { auth, db };