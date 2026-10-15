const express = require('express');
const router = express.Router();

// Memanggil logika database
const { simpanResepFavorit, getResepFavorit } = require('../controllers/userController');

// MENGAMBIL SATPAM DARI FOLDER MIDDLEWARE (Sesuai Clean Architecture)
const { verifyToken } = require('../middleware/authMiddleware');

// Mendaftarkan jalur URL (Harus lewat verifyToken dulu sebelum bisa simpan/ambil data)
router.post('/favorit', verifyToken, simpanResepFavorit);
router.get('/favorit', verifyToken, getResepFavorit);

module.exports = router;