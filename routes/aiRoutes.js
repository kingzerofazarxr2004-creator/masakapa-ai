const express = require('express');
const router = express.Router();

// 1. Mengimpor otak logika dari Controller
const { generateResep, scanKulkas } = require('../controllers/aiController');

// 2. Mengimpor Satpam Pembatas Kuota dari Middleware
const { apiLimiter } = require('../middleware/limitMiddleware');

// 3. Mendaftarkan jalur URL beserta Satpam-nya
// Ketika ada request masuk, lewati apiLimiter dulu, baru masuk ke generateResep/scanKulkas
router.post('/generate-resep', apiLimiter, generateResep);
router.post('/scan-kulkas', apiLimiter, scanKulkas);

module.exports = router;