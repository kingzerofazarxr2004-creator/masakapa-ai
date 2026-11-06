const rateLimit = require('express-rate-limit');

// Membuat aturan: 1 IP (User) diperbolehkan request hingga 1000 kali per hari
// (Limit tinggi khusus masa pengujian & sidang skripsi)
const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // Waktu reset: 24 jam (dalam milidetik)
    max: 1000,
    message: { error: "Terlalu banyak permintaan hari ini. Silakan coba lagi besok." },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { apiLimiter };