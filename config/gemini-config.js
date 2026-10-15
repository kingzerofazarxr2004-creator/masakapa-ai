const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Memeriksa apakah API Key sudah dipasang di file .env
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ ERROR: GEMINI_API_KEY belum diisi di file .env!");
    process.exit(1);
}

// Menginisialisasi Gemini dengan kunci rahasia
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Mengekspor genAI agar bisa di-import oleh file aiController.js nantinya
module.exports = genAI;