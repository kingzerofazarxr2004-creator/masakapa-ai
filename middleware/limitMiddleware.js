const rateLimit = require('express-rate-limit');

// Membuat aturan: 1 IP (User) diperbolehkan request hingga 10 kali per hari
const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // Waktu reset: 24 jam (dalam milidetik)
    max: 10, // Dikembalikan menjadi 10 limit per hari sesuai permintaan
    message: { error: "Waduh, limit harianmu habis! Kamu sudah meracik resep 10 kali hari ini. Coba lagi besok ya! 👨‍🍳" },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { apiLimiter };