const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet'); // <-- Helmet wajib dipanggil di sini

// Memuat kunci rahasia dari .env
dotenv.config();

// 1. BUAT APP-NYA DULU
const app = express();
const port = process.env.PORT || 3000;

// 2. PASANG HELMET (Dengan pengamanan yang dilonggarkan untuk CSS & Popup Login Google)
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Middleware agar bisa membaca folder public dan menerima data JSON
app.use(express.static('public'));
// Limit JSON diperbesar jadi 10mb agar server kuat menerima data foto (Scan Kulkas)
app.use(express.json({ limit: '10mb' }));

// 1. MENGIMPOR JALUR (ROUTES)
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// 2. MENYAMBUNGKAN JALUR KE URL UTAMA
// Jika Frontend memanggil '/api/ai/...', maka arahkan ke aiRoutes
app.use('/api/ai', aiRoutes);

// Jika Frontend memanggil '/api/user/...', maka arahkan ke userRoutes
app.use('/api/user', userRoutes);

// Jika Frontend memanggil '/api/auth/...', maka arahkan ke authRoutes
app.use('/api/auth', authRoutes);

// [TAMBAHAN BARU] Penangkap Error Global (Letaknya WAJIB sebelum app.listen)
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ error: 'Terjadi kesalahan internal pada server MasakApa.ai' });
});

// 3. Menyalakan Server
app.listen(port, () => {
    console.log(`✅ Server MasakApa.ai v2.0 (Clean Architecture) menyala di http://localhost:${port}`);
});