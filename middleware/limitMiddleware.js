const rateLimit = require('express-rate-limit');

// Membuat aturan: 1 IP (User) diperbolehkan request hingga 1000 kali per hari
// (Sengaja dibuat sangat tinggi agar aman dan tidak terblokir saat demonstrasi Sidang Skripsi)
const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // Waktu reset: 24 jam (dalam milidetik)
    max: 1000, 
    message: { error: "Sistem mendeteksi aktivitas tidak wajar. Silakan coba lagi nanti." },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { apiLimiter };