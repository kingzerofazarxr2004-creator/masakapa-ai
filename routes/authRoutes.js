const express = require('express');
const router = express.Router();

// Mengimpor Satpam Pemeriksa Kunci dari Middleware
const { verifyToken } = require('../middleware/authMiddleware');

// Mendaftarkan jalur URL untuk cek status login
// URL ini: GET /api/auth/status
router.get('/status', verifyToken, (req, res) => {
    // Jika kode berhasil sampai ke sini (lolos dari verifyToken),
    // artinya token pengguna asli dan masih aktif.
    res.status(200).json({
        message: "Sesi login valid!",
        user: {
            uid: req.user.uid,
            email: req.user.email,
            nama: req.user.name || "Koki Kosan",
            foto: req.user.picture || ""
        }
    });
});

module.exports = router;