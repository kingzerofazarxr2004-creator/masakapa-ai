document.addEventListener("DOMContentLoaded", async () => {

    // Konfigurasi Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDzLnMthTiiIpyoAN2DV8vsIUND9Hl1few",
        authDomain: "masakapa-ai-602c2.firebaseapp.com",
        projectId: "masakapa-ai-602c2",
        appId: "1:667324831089:web:ad32c570704089a8ca92d0"
    };

    const kotakResep = document.getElementById('isi-resep');
    const judulResep = document.getElementById('judul-resep');
    const btnFavorit = document.getElementById('btn-simpan-favorit');
    const btnCopyResep = document.getElementById('btn-copy-resep');
    const badgeContainer = document.getElementById('info-filter-badges');

    // Menarik status dari memori SessionStorage
    const bahanBahan = sessionStorage.getItem('bahanDipakai');
    const menuPilihan = sessionStorage.getItem('menuPilihan');
    const resepTersimpan = sessionStorage.getItem('resepTerbaru');
    const judulBukuResep = sessionStorage.getItem('judulResepMasaLalu');
    const alatMasak = sessionStorage.getItem('alatMasak');
    const budgetMasak = sessionStorage.getItem('budgetMasak');

    // Tampilkan Badge Alat & Budget jika digunakan
    if (badgeContainer) {
        if (alatMasak) {
            badgeContainer.innerHTML += `<span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"><i class="fa-solid fa-plug-circle-bolt mr-1"></i> ${alatMasak}</span>`;
        }
        if (budgetMasak) {
            badgeContainer.innerHTML += `<span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"><i class="fa-solid fa-wallet mr-1"></i> Maks Rp${Number(budgetMasak).toLocaleString('id-ID')}</span>`;
        }
    }

    // Fungsi Toast Notification Modern (Pengganti alert kaku)
    function showToast(pesan, tipe = 'sukses') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        const warna = tipe === 'error' ? 'bg-red-600' : 'bg-slate-900';
        const ikon = tipe === 'error' ? 'fa-circle-exclamation text-red-200' : 'fa-circle-check text-emerald-400';

        toast.className = `${warna} text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium fade-in-up pointer-events-auto`;
        toast.innerHTML = `<i class="fa-solid ${ikon}"></i><span>${pesan}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // Fungsi Render Teks AI ke HTML Terstruktur & Profesional
    const renderResep = (teks, judulUI) => {
        const barisArray = teks.split('\n');
        let htmlTerstruktur = '<div class="space-y-3 fade-in-up">';

        barisArray.forEach(baris => {
            let clean = baris.trim();
            if (!clean) return;

            // Format bold & italic markdown
            clean = clean
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="text-orange-600 font-medium">$1</em>');

            // Jika baris merupakan Heading bernomor utama (contoh: 1. Nama Masakan, 2. Estimasi Biaya)
            if (/^[1-5]\.\s/.test(clean) || /^#+\s/.test(clean)) {
                const teksJudulBagian = clean.replace(/^#+\s/, '');
                htmlTerstruktur += `
                    <div class="pt-4 first:pt-0">
                        <div class="px-4 py-2.5 bg-orange-50/90 border-l-4 border-orange-500 rounded-r-xl font-bold text-slate-900 text-sm sm:text-base">
                            ${teksJudulBagian}
                        </div>
                    </div>
                `;
            } else if (/^[-•*]\s/.test(clean)) {
                // Jika baris merupakan item daftar (bullet list)
                const itemTeks = clean.replace(/^[-•*]\s/, '');
                htmlTerstruktur += `
                    <div class="flex items-start gap-2.5 pl-2 text-sm sm:text-base text-slate-700">
                        <i class="fa-solid fa-check text-orange-500 text-xs mt-1.5"></i>
                        <span>${itemTeks}</span>
                    </div>
                `;
            } else {
                htmlTerstruktur += `<p class="text-sm sm:text-base text-slate-700 leading-relaxed pl-1">${clean}</p>`;
            }
        });

        htmlTerstruktur += '</div>';
        judulResep.innerText = judulUI;
        kotakResep.innerHTML = htmlTerstruktur;
    };

    const tampilkanError = (pesan) => {
        judulResep.innerText = "Gagal Meracik 😢";
        kotakResep.innerHTML = `
            <div class="text-center py-10 fade-in-up">
                <i class="fa-solid fa-triangle-exclamation text-5xl text-red-400 mb-4"></i>
                <p class="text-slate-600 font-medium mb-6 text-sm sm:text-base">${pesan}</p>
                <a href="/dashboard.html" class="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold shadow-md hover:bg-orange-600 transition-all text-sm">
                    <i class="fa-solid fa-arrow-left"></i> Kembali ke Kulkas
                </a>
            </div>
        `;
    };

    // LOGIKA UTAMA HALAMAN RESEP
    if (resepTersimpan) {
        let judul = judulBukuResep ? judulBukuResep : "Resep Spesial Anak Kos 🍳";
        if (!judulBukuResep && menuPilihan) judul = `Resep ${menuPilihan} 🍽️`;
        else if (!judulBukuResep && bahanBahan) judul = `Kreasi ${bahanBahan.split(',')[0]} 🍳`;
        renderResep(resepTersimpan, judul);

    } else if (bahanBahan || menuPilihan) {
        judulResep.innerText = `Menyiapkan Resep...`;

        const payloadData = { alat: alatMasak, budget: budgetMasak };
        if (menuPilihan) payloadData.menuPilihan = menuPilihan;
        else if (bahanBahan) payloadData.bahan = bahanBahan.split(', ');

        try {
            const response = await fetch('/api/ai/generate-resep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloadData)
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('resepTerbaru', data.resep);
                let judul = "Resep Spesial Anak Kos 🍳";
                if (menuPilihan) judul = `Resep ${menuPilihan} 🍽️`;
                else if (bahanBahan) judul = `Kreasi ${bahanBahan.split(',')[0]} 🍳`;
                renderResep(data.resep, judul);
            } else {
                tampilkanError(data.error);
            }
        } catch (error) {
            tampilkanError('Koneksi ke Dapur AI terputus! Pastikan internetmu stabil lalu coba lagi.');
        }
    } else {
        tampilkanError("Kamu belum memilih bahan atau menu apapun di Kulkas Virtual.");
    }

    // TOMBOL SALIN TEKS RESEP
    btnCopyResep?.addEventListener('click', () => {
        const teks = sessionStorage.getItem('resepTerbaru') || document.getElementById('resep-content').innerText;
        if (!teks) return;
        navigator.clipboard.writeText(teks).then(() => {
            showToast('Teks resep berhasil disalin ke clipboard!');
        });
    });

    // LOGIKA SIMPAN KE FIRESTORE
    if (btnFavorit) {
        btnFavorit.addEventListener('click', async () => {
            btnFavorit.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-1"></i> Menyimpan...`;

            try {
                const { getApps, initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
                const { getFirestore, collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");

                const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
                const db = getFirestore(app);
                const auth = getAuth(app);

                const getUser = () => new Promise(resolve => {
                    const unsub = auth.onAuthStateChanged(user => { unsub(); resolve(user); });
                });

                const user = await getUser();
                if (!user) {
                    showToast("Kamu harus login Google dulu untuk menyimpan resep!", "error");
                    btnFavorit.innerHTML = `<i class="fa-regular fa-bookmark mr-1"></i> Simpan Favorit`;
                    return;
                }

                await addDoc(collection(db, "resep_favorit"), {
                    uid: user.uid,
                    judul: judulResep.innerText,
                    teks_resep: sessionStorage.getItem('resepTerbaru'),
                    createdAt: Date.now()
                });

                btnFavorit.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Tersimpan!`;
                btnFavorit.classList.remove('text-orange-600', 'border-orange-200', 'hover:bg-orange-50');
                btnFavorit.classList.add('text-emerald-600', 'border-emerald-200', 'bg-emerald-50');
                btnFavorit.disabled = true;
                showToast("Resep berhasil disimpan ke Buku Resep Favorit!");

            } catch (error) {
                console.error("Gagal simpan ke Firestore:", error);
                showToast("Gagal menyimpan resep ke Cloud. Coba lagi nanti.", "error");
                btnFavorit.innerHTML = `<i class="fa-regular fa-bookmark mr-1"></i> Simpan Favorit`;
            }
        });
    }

    // LOGIKA SHARE WHATSAPP
    const btnShareWA = document.getElementById('btn-share-wa');
    if (btnShareWA) {
        btnShareWA.addEventListener('click', () => {
            const resepTeks = document.getElementById('resep-content').innerText;
            const pesan = `*Chef MasakApa.ai baru saja membuatkan resep khusus untukku!* 👨‍🍳🔥\n\n${resepTeks}\n\n_Diracik otomatis dengan AI MasakApa.ai_`;
            const urlWA = `https://api.whatsapp.com/send?text=${encodeURIComponent(pesan)}`;
            window.open(urlWA, '_blank');
        });
    }
});