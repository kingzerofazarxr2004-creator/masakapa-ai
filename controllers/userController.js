const { db } = require('../config/firebase-config');

// Fungsi 1: Menyimpan resep racikan AI ke Firestore
const simpanResepFavorit = async (req, res) => {
    try {
        // UID ini otomatis didapat dari authController (verifyToken)
        const uid = req.user.uid;
        const { judulResep, isiResep } = req.body;

        if (!judulResep || !isiResep) {
            return res.status(400).json({ error: "Judul dan isi resep tidak boleh kosong!" });
        }

        // Menyimpan data ke koleksi 'users' -> dokumen 'UID' -> koleksi 'favorit'
        const docRef = await db.collection('users').doc(uid).collection('favorit').add({
            judul: judulResep,
            resep: isiResep,
            tanggalSimpan: new Date().toISOString()
        });

        res.status(201).json({ message: "Resep berhasil disimpan ke buku favorit!", id: docRef.id });
    } catch (error) {
        console.error("Error Simpan Resep:", error);
        res.status(500).json({ error: "Gagal menyimpan resep ke database." });
    }
};

// Fungsi 2: Mengambil semua resep yang pernah disimpan user
const getResepFavorit = async (req, res) => {
    try {
        const uid = req.user.uid;

        // Mengambil data dan mengurutkannya dari yang paling baru disimpan
        const snapshot = await db.collection('users').doc(uid).collection('favorit')
            .orderBy('tanggalSimpan', 'desc').get();

        let daftarResep = [];
        snapshot.forEach(doc => {
            daftarResep.push({ id: doc.id, ...doc.data() });
        });

        res.json({ favorit: daftarResep });
    } catch (error) {
        console.error("Error Ambil Resep Favorit:", error);
        res.status(500).json({ error: "Gagal memuat daftar resep favorit." });
    }
};

module.exports = { simpanResepFavorit, getResepFavorit };