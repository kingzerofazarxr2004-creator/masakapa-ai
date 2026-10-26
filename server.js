const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');

// Memuat kunci rahasia dari .env
dotenv.config();

// 1. BUAT APP-NYA DULU
const app = express();
const port = process.env.PORT || 3000;

// PENTING UNTUK RAILWAY: Mengizinkan proxy agar express-rate-limit tidak error
app.set('trust proxy', 1);

// 2. PASANG HELMET
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Middleware agar bisa membaca folder public dan menerima data JSON
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

// MENGIMPOR JALUR (ROUTES)
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// MENYAMBUNGKAN JALUR KE URL UTAMA
app.use('/api/ai', aiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Penangkap Error Global
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ error: 'Terjadi kesalahan internal pada server MasakApa.ai' });
});

// Menyalakan Server
app.listen(port, () => {
    console.log(`✅ Server MasakApa.ai v2.0 (Clean Architecture) menyala di http://localhost:${port}`);
});