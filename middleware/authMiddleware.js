// Mengambil 'auth' dari konfigurasi baru
const { auth } = require('../config/firebase-config');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Akses ditolak! Kamu belum login." });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        // Mencocokkan kunci menggunakan fungsi auth Modular
        const decodedToken = await auth.verifyIdToken(idToken);

        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error Verifikasi Token:", error);
        return res.status(403).json({ error: "Sesi login tidak valid atau kadaluarsa." });
    }
};

module.exports = { verifyToken };