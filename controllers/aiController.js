const genAI = require('../config/gemini-config');

const daftarModel = [
    "gemini-3.8-flash",
    "gemini-3.5-flash-lite"
];

const tungguSeketika = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const panggilGeminiDenganFallback = async (promptData) => {
    let errorTerakhir;
    for (let i = 0; i < daftarModel.length; i++) {
        const namaModel = daftarModel[i];
        const batasCoba = 3;

        for (let j = 1; j <= batasCoba; j++) {
            try {
                console.log(`[AI] Sedang meracik dengan ${namaModel} (Percobaan ${j})...`);
                const model = genAI.getGenerativeModel({ model: namaModel });
                const result = await model.generateContent(promptData);
                console.log(`[AI] ✅ BERHASIL menggunakan model: ${namaModel}`);
                return result.response.text();
            } catch (error) {
                errorTerakhir = error;
                const pesanError = error.message;

                if (pesanError.includes("503") && j < batasCoba) {
                    const jeda = j * 3000;
                    console.warn(`[AI] ⚠️ Server penuh. Santai dulu ${jeda / 1000} detik sebelum ketuk ulang...`);
                    await tungguSeketika(jeda);
                    continue;
                }
                console.error(`[AI] ❌ GAGAL pakai ${namaModel}: ${pesanError.split('\n')[0]}`);
                break;
            }
        }
    }
    throw new Error("Lalu lintas server AI Google sedang sangat padat. Coba lagi dalam beberapa menit ya!");
};

const generateResep = async (req, res) => {
    try {
        // [UPDATE] Menerima tambahan alat dan budget dari Frontend
        const { bahan, menuPilihan, alat, budget } = req.body;
        let prompt = "";

        // [UPDATE] Aturan khusus untuk Anak Kos
        const filterAlat = alat ? `\n- PERALATAN TERSEDIA: ${alat}. Tolong pastikan langkah memasak HANYA menggunakan alat-alat ini.` : '';
        const filterBudget = budget ? `\n- BUDGET BELANJA EKSTRA: Maksimal Rp${budget}. Jika butuh bahan tambahan di luar yang saya sebutkan, pastikan harganya sangat murah dan totalnya tidak melebihi budget.` : '';

        if (menuPilihan) {
            prompt = `Tolong berikan daftar bahan-bahan dan langkah-langkah cara membuat masakan: ${menuPilihan}. 
            Sesuaikan porsi, alat, dan cara pembuatannya untuk gaya anak kost (praktis, murah, dan anti-ribet). ${filterAlat} ${filterBudget}
            Tuliskan dengan format:
            1. Nama Masakan
            2. Estimasi Biaya
            3. Waktu Memasak
            4. Bahan-bahan yang dibutuhkan
            5. Langkah-langkah singkat.`;
        } else if (bahan && bahan.length > 0) {
            prompt = `Saya adalah mahasiswa anak kos yang sedang berhemat di akhir bulan. 
            Di kulkas saya HANYA ada bahan berikut: ${bahan.join(', ')}. 
            Tolong buatkan 1 resep masakan yang paling masuk akal, lezat, dan mengenyangkan. ${filterAlat} ${filterBudget}
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