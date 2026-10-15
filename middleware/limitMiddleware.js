const rateLimit = require('express-rate-limit');

// Membuat aturan: 1 IP (User) hanya boleh request 5 kali dalam 24 jam
const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // Waktu reset: 24 jam (dalam milidetik)
    max: 5, // Batas maksimal request per user
    message: { error: "Waduh, limit harianmu habis! Kamu sudah meracik resep 5 kali hari ini. Coba lagi besok ya! 👨‍🍳" },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { apiLimiter };