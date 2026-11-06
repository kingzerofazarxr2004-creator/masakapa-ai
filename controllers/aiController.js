const genAI = require('../config/gemini-config');

// 🚀 DAFTAR MODEL "AJAIB" & SUPER CEPAT (Tahan Banting & Sesuai Free Tier)
// Disusun dari yang paling cepat merespons hingga model cadangan terakhir
const daftarModel = [
    "gemini-1.5-flash-8b",      // Paling ringan & paling ngebut (Waktu respons milidetik)
    "gemini-1.5-flash",         // Cepat & akurat (Standar)
    "gemini-1.5-flash-latest",  // Selalu diarahkan ke versi flash rilis terbaru
    "gemini-1.0-pro",           // Stabil (Model lama tapi masih sangat kuat)
    "gemini-pro"                // Fallback terakhir
];

// Fungsi delay disimpan untuk berjaga-jaga jika semua server penuh (Rate Limit Global)
const tungguSeketika = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const panggilGeminiDenganFallback = async (promptData) => {
    let errorTerakhir;

    for (let i = 0; i < daftarModel.length; i++) {
        const namaModel = daftarModel[i];

        try {
            console.log(`[AI] Sedang meracik dengan ${namaModel}...`);
            const model = genAI.getGenerativeModel({ model: namaModel });
            const result = await model.generateContent(promptData);

            console.log(`[AI] ✅ BERHASIL menggunakan model: ${namaModel}`);
            return result.response.text();

        } catch (error) {
            errorTerakhir = error;
            const pesanError = error.message || String(error);

            // Jika API Key tidak valid, langsung hentikan proses agar tidak buang waktu mencoba model lain
            if (pesanError.includes("API_KEY_INVALID") || pesanError.includes("API key not valid") || pesanError.includes("leaked") || pesanError.includes("403")) {
                throw new Error("GEMINI_API_KEY tidak valid atau diblokir. Periksa kredensial di Google AI Studio.");
            }

            console.warn(`[AI] ⚠️ GAGAL pakai ${namaModel}: ${pesanError.split('\n')[0]}. Langsung beralih ke model berikutnya...`);
            // Berkat kode ini, jika gagal, sistem TIDAK AKAN MENUNGGU. Langsung gas ke model AI selanjutnya.
            continue;
        }
    }

    // Jika kelima model di atas gagal semua, baru tampilkan error
    throw new Error(errorTerakhir?.message || "Lalu lintas server AI Google sedang sangat padat. Coba lagi dalam beberapa detik ya!");
};

const generateResep = async (req, res) => {
    try {
        const { bahan, menuPilihan, alat, budget, pedas } = req.body;
        let prompt = "";

        const filterAlat = alat ? `\n- PERALATAN TERSEDIA: ${alat}. Tolong pastikan langkah memasak HANYA menggunakan alat-alat ini.` : '';
        const filterBudget = budget ? `\n- BUDGET BELANJA EKSTRA: Maksimal Rp${budget}. Pastikan harganya sangat murah dan totalnya tidak melebihi budget.` : '';
        const filterPedas = pedas ? `\n- PREFERENSI LEVEL PEDAS: ${pedas}. Sesuaikan takaran cabai atau lada agar pas.` : '';

        if (menuPilihan) {
            prompt = `Tolong berikan daftar bahan-bahan dan langkah-langkah cara membuat masakan: ${menuPilihan}. 
            Sesuaikan porsi, alat, dan cara pembuatannya untuk gaya anak kost (praktis, murah, dan anti-ribet). ${filterAlat} ${filterBudget} ${filterPedas}
            Tuliskan dengan format:
            1. Nama Masakan
            2. Estimasi Biaya
            3. Waktu Memasak
            4. Bahan-bahan yang dibutuhkan
            5. Langkah-langkah singkat.`;
        } else if (bahan && bahan.length > 0) {
            prompt = `Saya adalah mahasiswa anak kos yang sedang berhemat. 
            Di kulkas saya HANYA ada bahan berikut: ${bahan.join(', ')}. 
            Tolong buatkan 1 resep masakan yang paling masuk akal, lezat, dan mengenyangkan. ${filterAlat} ${filterBudget} ${filterPedas}
            Tuliskan dengan format:
            1. Nama Masakan (Beri nama yang kreatif)
            2. Estimasi Biaya (Sangat murah)
            3. Waktu Memasak
            4. Bahan-bahan yang dibutuhkan (Pisahkan antara bahan yang sudah saya miliki dan bahan tambahan yang harus dibeli)
            5. Langkah-langkah singkat.`;
        } else {
            return res.status(400).json({ error: "Bahan makanan atau pilihan menu tidak boleh kosong!" });
        }

        const teksResep = await panggilGeminiDenganFallback(prompt);
        res.json({ resep: teksResep });

    } catch (error) {
        console.error("Error AI Generate Resep:", error);
        res.status(500).json({ error: error.message || "Koki AI sedang pusing. Coba lagi nanti ya!" });
    }
};

const scanKulkas = async (req, res) => {
    try {
        const { imageBase64 } = req.body;

        if (!imageBase64) {
            return res.status(400).json({ error: "Gambar bahan makanan tidak ditemukan!" });
        }

        const prompt = `Perhatikan gambar bahan makanan ini. Berikan 5 hingga 10 rekomendasi nama masakan lezat dan praktis ala anak kos yang bisa dibuat HANYA dengan bahan-bahan dominan di gambar tersebut (boleh ditambah bumbu dasar biasa). 
        Format keluaran WAJIB HANYA berupa JSON Array string murni, tanpa teks awalan/akhiran, tanpa format markdown. 
        Contoh persis: ["Telur Dadar Crispy", "Tumis Sayur Pedas", "Sup Bening Sederhana"]`;

        const imageParts = [{ inlineData: { data: imageBase64, mimeType: "image/jpeg" } }];
        const responseAI = await panggilGeminiDenganFallback([prompt, ...imageParts]);

        let menuRekomendasi = [];
        try {
            let cleanJson = responseAI.replace(/```json/g, '').replace(/```/g, '').trim();
            menuRekomendasi = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Gagal memecah JSON dari AI:", responseAI);
            return res.status(500).json({ error: "Koki AI kesulitan mengenali bahannya. Coba foto dengan lebih terang!" });
        }

        res.json({ daftarMenu: menuRekomendasi });

    } catch (error) {
        console.error("Error AI Scan Kulkas:", error);
        res.status(500).json({ error: error.message || "Gagal mendeteksi gambar kulkas." });
    }
};

module.exports = { generateResep, scanKulkas };