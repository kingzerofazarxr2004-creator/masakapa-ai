const genAI = require('../config/gemini-config');

// Gunakan SATU model standar yang paling stabil, cepat, dan dijamin aktif
const namaModelUtama = "gemini-1.5-flash";


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

        console.log(`[AI] Meracik resep dengan ${namaModelUtama}...`);
        const model = genAI.getGenerativeModel({ model: namaModelUtama });

        // Memanggil AI dengan format yang sangat sederhana dan aman
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log(`[AI] ✅ BERHASIL membuat resep`);
        res.json({ resep: responseText });

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

        console.log(`[AI] Menganalisis gambar dengan ${namaModelUtama}...`);
        const model = genAI.getGenerativeModel({ model: namaModelUtama });

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg"
            }
        };

        // Memanggil AI untuk menganalisis teks dan gambar sekaligus
        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();

        let menuRekomendasi = [];
        try {
            let cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            menuRekomendasi = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Gagal memecah JSON dari AI:", responseText);
            return res.status(500).json({ error: "Koki AI kesulitan mengenali bahannya. Coba foto dengan lebih terang!" });
        }

        console.log(`[AI] ✅ BERHASIL mengenali bahan`);
        res.json({ daftarMenu: menuRekomendasi });

    } catch (error) {
        console.error("Error AI Scan Kulkas:", error);
        res.status(500).json({ error: error.message || "Gagal mendeteksi gambar kulkas." });
    }
};

module.exports = { generateResep, scanKulkas };